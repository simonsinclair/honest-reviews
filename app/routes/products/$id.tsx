import type { Prisma } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { StarRating } from '~/components/StarRating';

import { getProductById } from '~/models/product.server';
import { getRatingByProductId } from '~/models/review.server';
import { getValueRoundedToDecimalPlaces } from '~/utils';

export type ProductLayoutLoaderData = {
  product: NonNullable<Prisma.PromiseReturnType<typeof getProductById>>;
  rating: NonNullable<Prisma.PromiseReturnType<typeof getRatingByProductId>>;
};

const ProductLayout = () => {
  const { product, rating } = useLoaderData<ProductLayoutLoaderData>();

  const averageRatingRounded = getValueRoundedToDecimalPlaces(
    rating?._avg?.rating ?? 0,
    1,
  );

  return (
    <>
      <div className="mb-4 bg-white shadow-sm">
        <div className="container mx-auto space-y-2 px-4 py-6">
          <h1>
            <Link
              to={`/products/${product.id}`}
              className="font-bold hover:underline"
            >
              {product.name}
            </Link>
          </h1>
          <div className="flex items-center gap-2">
            <StarRating
              rating={averageRatingRounded}
              size={20}
              ariaLabel={`Rated ${averageRatingRounded} out of 5.`}
            />
            <span
              aria-hidden
              className="leading-none opacity-75 before:mr-2 before:content-['•']"
            >
              {averageRatingRounded} ({rating._count} reviews)
            </span>
          </div>
          <p className="max-w-prose">{product.description}</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  invariant(id, 'Expected parameter `id` to be defined.');

  const product = await getProductById({ id });
  if (!product) throw new Response('Not Found', { status: 404 });

  const rating = await getRatingByProductId({ id });

  const data: ProductLayoutLoaderData = {
    product,
    rating,
  };

  return json(data);
};

export default ProductLayout;
