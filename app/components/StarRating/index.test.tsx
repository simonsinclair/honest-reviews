import { render, screen } from '@testing-library/react';

import { StarRating } from '.';

describe('StarRating', () => {
  it('renders a visual representation of 5 out of 10', () => {
    const rating = 5;
    const ratingMax = 10;

    render(
      <StarRating
        rating={rating}
        ratingMax={ratingMax}
        ariaLabel={`Rated ${rating} out of ${ratingMax}.`}
      />,
    );

    expect(
      screen.getByRole('img', { name: 'Rated 5 out of 10.' }),
    ).toBeInTheDocument();
  });
});
