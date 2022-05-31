import type { Product } from '@prisma/client';
import { json } from '@remix-run/node';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getProducts } from '~/models/product.server';

type LoaderData = {
  products: Product[];
};

export const meta: MetaFunction = () => ({
  title: 'Products – Honest Reviews',
  description: 'Discover the best products on Honest Reviews.',
});

const ProductsPage = () => {
  const { products } = useLoaderData<LoaderData>();

  return (
    <>
      <div className="mb-4 bg-white shadow-sm">
        <div className="container mx-auto p-4">
          <h1>Products</h1>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-12 gap-4">
            {products.map(({ id, name, description }) => (
              <div
                className="col-span-full space-y-2 rounded-lg bg-white p-4 shadow-sm lg:col-span-8 lg:col-start-3"
                key={id}
              >
                <h2>
                  <Link
                    to={`/products/${id}`}
                    className="font-bold hover:underline"
                  >
                    {name}
                  </Link>
                </h2>
                <p>{description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no products to display.</p>
        )}
      </div>
    </>
  );
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    products: await getProducts(),
  };
  return json(data);
};

export default ProductsPage;
