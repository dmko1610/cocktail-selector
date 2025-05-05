import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

describe('NotFound', () => {
  it('displays a 404 message', () => {
    render(<NotFound />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(
      screen.getByText(/Page not found. Try a cocktail from the sidebar./)
    ).toBeInTheDocument();
  });
});
