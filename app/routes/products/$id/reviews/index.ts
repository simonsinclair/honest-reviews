import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params;
  invariant(id, 'Expected parameter `id` to be defined.');
  return redirect(`/products/${id}#reviews`);
};
