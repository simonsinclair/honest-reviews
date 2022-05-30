import type { Prisma } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import type { ChartData, ChartDataset } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';

import { getProductById } from '~/models/product.server';
import {
  getAverageDailyRatingsByProductId,
  getReviewsByProductId,
  getRatingByProductId,
} from '~/models/review.server';

type LoaderData = {
  product: NonNullable<Prisma.PromiseReturnType<typeof getProductById>>;
  chart: {
    labels: ChartData<'line'>['labels'];
    data: ChartDataset<'line'>['data'];
  };
  rating: NonNullable<Prisma.PromiseReturnType<typeof getRatingByProductId>>;
  reviews: NonNullable<Prisma.PromiseReturnType<typeof getReviewsByProductId>>;
};

export const meta: MetaFunction = ({ data }) => {
  if (data) {
    const { product, rating } = data as LoaderData;
    return {
      title: `${product.name} – Honest Reviews`,
      description: `Read what ${rating._count} honest reviewers have to say about ${product.name}.`,
    };
  }
  return {
    title: 'Product Not Found - Honest Reviews',
    description: 'The requested product was not found.',
  };
};

const ProductPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { product, chart, rating, reviews } = useLoaderData<LoaderData>();

  useEffect(() => {
    Chart.register(...registerables);
    const ratingTrendChart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: chart.labels,
        datasets: [
          {
            data: chart.data,
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
    return () => ratingTrendChart.destroy();
  }, [chart.data, chart.labels]);

  return (
    <div className="container mx-auto space-y-4 p-4">
      <div className="space-y-4">
        <h1>{product.name}</h1>
        <ul className="flex gap-4">
          <li>
            <Link to="#reviews">Reviews {rating._count}</Link>
          </li>
          {rating._avg.rating !== null ? <li>{rating._avg.rating}</li> : null}
        </ul>
        <p>{product.description}</p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full space-y-4 rounded-lg bg-white p-4 shadow lg:col-span-8">
          <h2>Write a review</h2>
          <Form method="post" className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  className="rounded-lg border p-2"
                  name="name"
                  id="name"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  className="rounded-lg border p-2"
                  name="email"
                  id="email"
                  placeholder="jane.reviews@gmail.com"
                  required
                />
              </div>
            </div>
            <fieldset className="flex flex-col gap-1">
              <legend>Rating</legend>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <label htmlFor="rating-1">1</label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-1"
                    value="1"
                    required
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="rating-2">2</label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-2"
                    value="2"
                    required
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="rating-3">3</label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-3"
                    value="3"
                    required
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="rating-4">4</label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-4"
                    value="4"
                    required
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="rating-5">5</label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-5"
                    value="5"
                    required
                  />
                </div>
              </div>
            </fieldset>
            <div className="flex flex-col gap-1">
              <label htmlFor="body">Review</label>
              <small>Keep it honest, helpful, and constructive.</small>
              <textarea
                name="body"
                id="body"
                cols={20}
                rows={5}
                className="resize-y rounded-lg border"
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-sky-300 px-5 py-3 font-bold antialiased transition-colors hover:bg-sky-200 sm:w-auto"
              >
                Post review
              </button>
            </div>
          </Form>
        </div>
        <div className="col-span-full lg:col-span-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <h2>Rating trend</h2>
            <canvas ref={canvasRef}>{/* To do: accessible content */}</canvas>
          </div>
        </div>
        <section className="col-span-full rounded-lg bg-white p-4 shadow lg:col-span-8">
          <h2 className="flex items-center gap-2 border-b pb-4" id="reviews">
            Reviews{' '}
            <span className="rounded bg-sky-900 py-1 px-1.5 font-mono text-sm font-bold leading-none text-white antialiased">
              {rating._count}
            </span>
          </h2>
          <div className="divide-y">
            {reviews.map(({ id, body, createdAt, rating, User }) => {
              return (
                <article key={id} className="flex flex-col-reverse gap-4 py-4">
                  {body.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <footer className="flex justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${User.email}`} className="font-bold">
                        {User.name}
                      </a>
                      <span className="opacity-75">{rating} stars</span>
                    </div>
                    <time dateTime={createdAt.toString()}>
                      {createdAt.toString()}
                    </time>
                  </footer>
                </article>
              );
            })}
            <div className="flex justify-center pt-6 pb-2">Pagination</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  invariant(id, 'Expected parameter `id` to be defined.');

  const product = await getProductById({ id });
  if (!product) throw new Response('Not Found', { status: 404 });

  const rating = await getRatingByProductId({ id });
  const reviews = await getReviewsByProductId({ id });

  const SME_DAYS = 30;
  const RANGE_DAYS = SME_DAYS * 6;

  const averageDailyRatings = await getAverageDailyRatingsByProductId({
    id,
    take: -RANGE_DAYS,
    order: 'desc',
  });

  /**
   * Calculate Simple Moving Average.
   */
  let chartData: number[] = [];
  let chartLabels: string[] = [];
  let sum = 0;
  let smeDay = SME_DAYS;
  for (let i = 0; i < averageDailyRatings.length; i++) {
    if (i > 0 && i % SME_DAYS === 0) {
      chartLabels.push(`Day ${smeDay}`);
      smeDay += SME_DAYS;
      chartData.push(sum / SME_DAYS);
      sum = 0;
    }
    const rating = averageDailyRatings[i]._avg.rating;
    if (rating !== null) sum += rating;
  }

  const data: LoaderData = {
    product,
    chart: {
      labels: chartLabels,
      data: chartData,
    },
    rating,
    reviews,
  };

  return json(data);
};

export default ProductPage;
