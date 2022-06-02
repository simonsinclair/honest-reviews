import type { ChangeEventHandler } from 'react';
import { useState } from 'react';

import { StarRating } from '~/components/StarRating';

type Props = {
  defaultValue?: string;
};

const isChecked = (value: Props['defaultValue'], match: string) => {
  if (value === undefined) return false;
  return value === match;
};

export const StarRatingInput = ({ defaultValue }: Props) => {
  const [rating, setRating] = useState(0);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRating(Number(event.target.value));
  };

  return (
    <fieldset className="flex flex-col gap-1">
      <legend>Rating</legend>
      <div className="relative">
        <StarRating rating={rating} size={48} />
        <div className="absolute inset-0 flex font-mono">
          <div>
            <input
              className="peer sr-only"
              onChange={handleOnChange}
              type="radio"
              name="rating"
              id="rating-1"
              value="1"
              defaultChecked={isChecked(defaultValue, '1')}
              required
            />
            <label
              htmlFor="rating-1"
              className="flex h-12 w-12 cursor-pointer items-center justify-center pt-0.5 peer-focus-visible:ring"
            >
              1
            </label>
          </div>
          <div>
            <input
              className="peer sr-only"
              onChange={handleOnChange}
              type="radio"
              name="rating"
              id="rating-2"
              value="2"
              defaultChecked={isChecked(defaultValue, '2')}
              required
            />
            <label
              htmlFor="rating-2"
              className="flex h-12 w-12 cursor-pointer items-center justify-center pt-0.5 peer-focus-visible:ring"
            >
              2
            </label>
          </div>
          <div>
            <input
              className="peer sr-only"
              onChange={handleOnChange}
              type="radio"
              name="rating"
              id="rating-3"
              value="3"
              defaultChecked={isChecked(defaultValue, '3')}
              required
            />
            <label
              htmlFor="rating-3"
              className="flex h-12 w-12 cursor-pointer items-center justify-center pt-0.5 peer-focus-visible:ring"
            >
              3
            </label>
          </div>
          <div>
            <input
              className="peer sr-only"
              onChange={handleOnChange}
              type="radio"
              name="rating"
              id="rating-4"
              value="4"
              defaultChecked={isChecked(defaultValue, '4')}
              required
            />
            <label
              htmlFor="rating-4"
              className="flex h-12 w-12 cursor-pointer items-center justify-center pt-0.5 peer-focus-visible:ring"
            >
              4
            </label>
          </div>
          <div>
            <input
              className="peer sr-only"
              onChange={handleOnChange}
              type="radio"
              name="rating"
              id="rating-5"
              value="5"
              defaultChecked={isChecked(defaultValue, '5')}
              required
            />
            <label
              htmlFor="rating-5"
              className="flex h-12 w-12 cursor-pointer items-center justify-center pt-0.5 peer-focus-visible:ring"
            >
              5
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  );
};
