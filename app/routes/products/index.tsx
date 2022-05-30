import type { Product } from '@prisma/client';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getProducts } from '~/models/product.server';

type LoaderData = {
  products: Product[];
};

const ProductsPage = () => {
  const { products } = useLoaderData<LoaderData>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4">Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products.map(({ id, name, description }) => (
            <div className="space-y-2 rounded bg-gray-100 p-4" key={id}>
              <h2>
                <Link to={`/products/${id}`}>{name}</Link>
              </h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no products to display.</p>
      )}
    </div>
  );
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    products: await getProducts(),
  };
  return json(data);
};

export default ProductsPage;
