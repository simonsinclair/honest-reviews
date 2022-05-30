import type { Prisma } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { ChartData, ChartDataset } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';

import { getProductById } from '~/models/product.server';
import { getDailyRatingsByProductId } from '~/models/review.server';

type LoaderData = {
  product: NonNullable<Prisma.PromiseReturnType<typeof getProductById>>;
  labels: ChartData<'line'>['labels'];
  ratings: ChartDataset<'line'>['data'];
};

const ProductPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { product, ratings, labels } = useLoaderData<LoaderData>();

  useEffect(() => {
    Chart.register(...registerables);
    new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: ratings,
            animation: false,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 6,
          },
          x: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [ratings, labels]);

  return (
    <div className="container mx-auto p-4">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <canvas ref={canvasRef}>{/* To do: accessible content */}</canvas>
    </div>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  invariant(id, 'Expected parameter `id` to be defined.');
  const product = await getProductById({ id });
  if (!product) throw new Response('Not Found', { status: 404 });

  const SME_DAYS = 30;
  const RANGE_DAYS = SME_DAYS * 6;

  const dailyRatings = await getDailyRatingsByProductId({
    id,
    take: -RANGE_DAYS,
    order: 'desc',
  });

  /**
   * Calculate Simple Moving Average.
   */
  let ratings: number[] = [];
  let labels: string[] = [];
  let sum = 0;
  let smeDay = SME_DAYS;
  for (let i = 0; i < dailyRatings.length; i++) {
    if (i > 0 && i % SME_DAYS === 0) {
      labels.push(`Day ${smeDay}`);
      smeDay += SME_DAYS;
      ratings.push(sum / SME_DAYS);
      sum = 0;
    }
    const rating = dailyRatings[i]._avg.rating;
    if (rating !== null) sum += rating;
  }

  const data: LoaderData = {
    product,
    labels,
    ratings,
  };

  return json(data);
};

export default ProductPage;
