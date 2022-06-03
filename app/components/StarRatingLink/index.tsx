import { Link } from '@remix-run/react';

import { StarRating } from '~/components/StarRating';
import { RATING_MAX } from '~/lib/constants';

type Props = {
  href: string;
  rating: number;
  ratingCount: number;
};

export const StarRatingLink = ({ rating, ratingCount, href }: Props) => (
  <Link
    to={href}
    className="group flex w-min items-center gap-2 whitespace-nowrap leading-none"
  >
    <StarRating
      rating={rating}
      size={20}
      ariaLabel={`Rated ${rating} out of ${RATING_MAX}.`}
    />
    <span aria-hidden className="opacity-75 before:mr-2 before:content-['•']">
      {rating}
    </span>
    <span className="opacity-75 group-hover:underline">
      ({ratingCount} reviews)
    </span>
  </Link>
);
