import { render, screen } from '@testing-library/react';

import { TimeFromNow } from '.';

describe('TimeFromNow', () => {
  it('renders the date now in relative form', () => {
    const dateNow = new Date();

    render(<TimeFromNow date={dateNow} />);

    const time = screen.getByText('a few seconds ago');

    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('datetime', dateNow.toString());
  });
});
