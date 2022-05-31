import type { ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, useTransition, Form } from '@remix-run/react';
import invariant from 'tiny-invariant';
import prisma from '~/services/database.server';

type ActionData = {
  error: boolean;
  fields: {
    name: string;
    email: string;
    rating: string;
    body: string;
  };
};

const NewReviewPage = () => {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <div className="container mx-auto space-y-4 rounded-lg bg-white p-4 shadow lg:col-span-8">
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
              defaultValue={actionData?.fields.name}
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
              defaultValue={actionData?.fields.email}
              placeholder="jane.reviews@gmail.com"
              required
            />
          </div>
        </div>
        <fieldset
          className="flex flex-col gap-1"
          defaultValue={actionData?.fields.rating}
        >
          <legend>Rating</legend>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <label htmlFor="rating-1">1</label>
              <input
                type="radio"
                name="rating"
                id="rating-1"
                value="1"
                defaultChecked={actionData?.fields.rating === '1'}
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
                defaultChecked={actionData?.fields.rating === '2'}
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
                defaultChecked={actionData?.fields.rating === '3'}
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
                defaultChecked={actionData?.fields.rating === '4'}
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
                defaultChecked={actionData?.fields.rating === '5'}
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
            className="resize-y rounded-lg border p-2"
            defaultValue={actionData?.fields.body}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-end gap-4">
          {actionData?.error ? (
            <p className="text-red-700">
              There was an error posting your review.
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-300 px-5 py-3 font-bold antialiased transition-colors hover:bg-sky-200 sm:w-auto"
          >
            {transition.state === 'submitting' ? (
              <span>Posting review&hellip;</span>
            ) : (
              'Post review'
            )}
          </button>
        </div>
      </Form>
    </div>
  );
};

export const action: ActionFunction = async ({ params, request }) => {
  const { id: productId } = params;
  invariant(productId, 'Expected parameter `id` to be defined.');

  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const rating = formData.get('rating');
  const body = formData.get('body');

  invariant(typeof name === 'string', 'Invalid name.');
  invariant(typeof email === 'string', 'Invalid email.');
  invariant(typeof rating === 'string', 'Invalid rating.');
  invariant(typeof body === 'string', 'Invalid body.');

  const createdAt = new Date();
  const createdAtDay = new Date(createdAt);
  createdAtDay.setUTCHours(0, 0, 0, 0);

  try {
    await prisma.review.create({
      data: {
        createdAt,
        createdAtDay,
        rating: Number(rating),
        body,
        Product: {
          connect: {
            id: productId,
          },
        },
        User: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              name,
              email,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    const fields = Object.fromEntries(formData);
    return json({ error: true, fields });
  }

  return redirect(`/products/${productId}#reviews`);
};

export default NewReviewPage;
