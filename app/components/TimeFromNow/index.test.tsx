import { render, screen } from '@testing-library/react';

import { TimeFromNow } from '.';

describe('TimeFromNow', () => {
  it('displays a relative representation of the date now', () => {
    const dateNow = new Date();

    render(<TimeFromNow date={dateNow} />);

    const time = screen.getByText('a few seconds ago');

    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('datetime', dateNow.toString());
  });
});
