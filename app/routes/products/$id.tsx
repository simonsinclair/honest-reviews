import type { Prisma } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { getProductById } from '~/models/product.server';
import { getRatingByProductId } from '~/models/review.server';

type LoaderData = {
  product: NonNullable<Prisma.PromiseReturnType<typeof getProductById>>;
  rating: NonNullable<Prisma.PromiseReturnType<typeof getRatingByProductId>>;
};

const ProductLayout = () => {
  const { product, rating } = useLoaderData<LoaderData>();

  return (
    <>
      <div className="bg-white shadow-sm mb-4">
        <div className="container mx-auto space-y-4 p-4">
          <h1>{product.name}</h1>
          <ul className="flex gap-4">
            <li>
              <Link to="#reviews">Reviews {rating._count}</Link>
            </li>
            {rating._avg.rating !== null ? <li>{rating._avg.rating}</li> : null}
          </ul>
          <p>{product.description}</p>
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

  const data: LoaderData = {
    product,
    rating,
  };

  return json(data);
};

export default ProductLayout;
