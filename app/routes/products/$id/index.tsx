import type { Prisma } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData, useSearchParams } from '@remix-run/react';
import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
} from '~/components/Icons';
import { StarRating } from '~/components/StarRating';
import { TimeFromNow } from '~/components/TimeFromNow';
import { useRouteData } from '~/hooks/useRouteData';
import {
  getAverageDailyRatingsByProductId,
  getReviewsByProductId,
} from '~/models/review.server';
import {
  getSanitisedPageParam,
  getSkipValue,
  getNumberRoundedToDecimalPlaces,
  getChartDataAltText,
} from '~/lib/utils';
import type { ProductLayoutLoaderData } from '~/routes/products/$id';
import { DEFAULT_TAKE, RATING_MAX } from '~/lib/constants';
import { Pagination } from '~/components/Pagination';

type LoaderData = {
  chart: {
    labels: string[];
    data: number[];
  };
  reviews: NonNullable<Prisma.PromiseReturnType<typeof getReviewsByProductId>>;
};

export const meta: MetaFunction = ({ parentsData }) => {
  const data = parentsData['routes/products/$id'];
  if (data) {
    const { product, rating } = data as ProductLayoutLoaderData;
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
  const { chart, reviews } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const { rating } = useRouteData<ProductLayoutLoaderData>(
    'routes/products/$id',
  );

  useEffect(() => {
    Chart.register(...registerables);
    const ratingTrendChart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: chart.labels,
        datasets: [
          {
            label: '30-Day Simple Moving Average',
            data: chart.data,
            animation: false,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
            borderColor: '#38bdf8',
            backgroundColor: '#bae6fd',
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: 1,
            max: 5,
          },
        },
      },
    });
    return () => ratingTrendChart.destroy();
  }, [chart.data, chart.labels]);

  const totalPages = Math.ceil((rating._count || 1) / DEFAULT_TAKE);
  const currentPage = getSanitisedPageParam(searchParams.get('page'));

  return (
    <div className="container mx-auto grid grid-cols-12 gap-4 px-4">
      <div className="col-span-full lg:order-last lg:col-span-4">
        <div className="space-y-2 rounded-lg bg-white p-4 shadow-sm lg:sticky lg:top-4">
          <h2>Rating trend</h2>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`A line chart showing rating as a 30-Day Simple Moving Average. ${getChartDataAltText(
              chart.data.map((value, index) => [
                chart.labels[index] ?? 'Unknown',
                value,
              ]),
            )}`}
          />
        </div>
      </div>
      <section className="col-span-full rounded-lg bg-white p-4 shadow-sm lg:col-span-8">
        <div className="flex items-center justify-between gap-4 border-b pb-4">
          <h2 className="flex items-center gap-2" id="reviews">
            Reviews <span className="opacity-75">{rating._count}</span>
          </h2>
          <Link
            to="reviews/new"
            className="flex items-center gap-1.5 text-lg font-bold hover:underline"
          >
            Write a review <EditIcon aria-hidden />
          </Link>
        </div>
        <div className="divide-y">
          {reviews.map(({ id, body, createdAt, rating, User }) => {
            const averageRatingRounded = getNumberRoundedToDecimalPlaces(
              rating,
              1,
            );
            return (
              <article key={id} className="flex flex-col-reverse gap-4 py-4">
                {body.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <footer className="flex justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <a
                      href={`mailto:${User.email}`}
                      className="font-bold hover:underline"
                    >
                      {User.name}
                    </a>
                    <StarRating
                      rating={averageRatingRounded}
                      size={14}
                      ariaLabel={`Rated ${averageRatingRounded} out of ${RATING_MAX}.`}
                    />
                  </div>
                  <TimeFromNow date={createdAt} />
                </footer>
              </article>
            );
          })}
          {totalPages > 1 ? (
            <div className="flex items-center justify-center gap-1 pt-6 pb-2">
              {currentPage > 1 ? (
                <Link
                  to={`?page=${currentPage - 1}`}
                  className="flex items-center rounded-full p-2 shadow hover:shadow-sky-400"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    aria-hidden
                    className="relative right-[0.0625rem]"
                  />
                </Link>
              ) : null}
              <Pagination totalPages={totalPages} currentPage={currentPage} />
              {currentPage < totalPages ? (
                <Link
                  to={`?page=${currentPage + 1}`}
                  className="flex items-center rounded-full p-2 shadow hover:shadow-sky-400"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon
                    aria-hidden
                    className="relative left-[0.0625rem]"
                  />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  invariant(id, 'Expected parameter `id` to be defined.');

  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const skip = getSkipValue(getSanitisedPageParam(page), DEFAULT_TAKE);

  const reviews = await getReviewsByProductId({ id, skip, take: DEFAULT_TAKE });

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
    const averageDailyRating = averageDailyRatings[i]._avg.rating;
    if (averageDailyRating !== null) sum += averageDailyRating;
  }

  const data: LoaderData = {
    chart: {
      labels: chartLabels,
      data: chartData,
    },
    reviews,
  };

  return json(data);
};

export default ProductPage;
