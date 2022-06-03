import type { ChangeEventHandler } from 'react';
import { useState } from 'react';

import { StarRating } from '~/components/StarRating';
import { RATING_MAX } from '~/lib/constants';

type Props = {
  defaultValue?: string;
  ratingMax?: number;
};

const isChecked = (value: Props['defaultValue'], match: string) => {
  if (value === undefined) return false;
  return value === match;
};

export const StarRatingInput = ({
  defaultValue,
  ratingMax = RATING_MAX,
}: Props) => {
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
          {Array.from({ length: ratingMax }, (_, index) => index + 1).map(
            (value) => (
              <div key={value}>
                <input
                  className="peer sr-only"
                  onChange={handleOnChange}
                  type="radio"
                  name="rating"
                  id={`rating-${value}`}
                  value={String(value)}
                  defaultChecked={isChecked(defaultValue, String(value))}
                  required
                />
                <label
                  htmlFor={`rating-${value}`}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center pt-0.5 peer-focus-visible:ring"
                >
                  {value}
                </label>
              </div>
            ),
          )}
        </div>
      </div>
    </fieldset>
  );
};
