import type { ChangeEventHandler } from 'react';
import { useState } from 'react';

import { StarRating } from '~/components/StarRating';
import { RATING_MAX } from '~/lib/constants';

type Props = {
  defaultValue?: string;
  ratingMax?: number;
};

const getFieldData = (_: never, index: number) => {
  const value = String(index + 1);
  return {
    id: `rating-${value}`,
    value,
    isChecked: (rating: number) => rating === Number(value),
  };
};

export const StarRatingInput = ({
  defaultValue = '0',
  ratingMax = RATING_MAX,
}: Props) => {
  const [rating, setRating] = useState(Number(defaultValue));

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRating(Number(event.target.value));
  };

  const fieldsData = Array.from({ length: ratingMax }, getFieldData);

  return (
    <fieldset className="flex flex-col gap-1" role="radiogroup">
      <legend>Rating</legend>
      <div className="relative">
        <StarRating rating={rating} size={48} />
        <div className="absolute inset-0 flex font-mono">
          {fieldsData.map(({ id, isChecked, value }) => (
            <div key={id}>
              <input
                className="peer sr-only"
                onChange={handleOnChange}
                type="radio"
                name="rating"
                id={id}
                value={value}
                defaultChecked={isChecked(rating)}
                required
              />
              <label
                htmlFor={id}
                className="flex h-12 w-12 cursor-pointer items-center justify-center pt-0.5 font-bold text-white peer-focus-visible:ring"
              >
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  );
};
