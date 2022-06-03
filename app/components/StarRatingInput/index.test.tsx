import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StarRatingInput } from '.';

describe('StarRatingInput', () => {
  it('renders a preselected rating of 4 out of 5', () => {
    render(<StarRatingInput defaultValue="4" />);

    expect(
      screen.getByRole('radiogroup', { name: 'Rating' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '1' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '2' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '3' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '4' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '5' })).not.toBeChecked();
  });

  it('allows a user to select a rating out of 3', async () => {
    const user = userEvent.setup();

    render(<StarRatingInput ratingMax={3} />);

    expect(
      screen.getByRole('radiogroup', { name: 'Rating' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '1' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '2' })).not.toBeChecked();
    const inputThree = screen.getByRole('radio', { name: '3' });
    expect(inputThree).not.toBeChecked();

    await user.click(inputThree);
    expect(inputThree).toBeChecked();
  });
});
