import { RATING_MAX } from '~/lib/constants';

type Props = {
  rating: number;
  size?: number;
  ariaLabel?: string;
  ratingMax?: number;
};

const star =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%2338bdf8" stroke="%2338bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
const starNone =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2338bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';

export const StarRating = ({
  rating,
  size = 24,
  ariaLabel,
  ratingMax = RATING_MAX,
}: Props) => (
  <span
    aria-label={ariaLabel}
    role="img"
    style={{
      backgroundImage: `url('data:image/svg+xml;utf8,${starNone}')`,
      backgroundSize: `${size}px ${size}px`,
      width: `${size * ratingMax}px`,
      height: `${size}px`,
    }}
    className="inline-block bg-repeat-x"
  >
    <div
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,${star}')`,
        backgroundSize: `${size}px ${size}px`,
        width: `${rating * size}px`,
        height: `${size}px`,
      }}
      className="overflow-x-hidden bg-repeat-x"
    />
  </span>
);
