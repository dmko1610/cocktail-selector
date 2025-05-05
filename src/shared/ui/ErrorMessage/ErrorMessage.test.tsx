import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage';

function renderErrorMessage({
  props = { error: 'Network error', onRetry: vi.fn() },
}: {
  props?: { error: string; onRetry: () => void };
}) {
  render(<ErrorMessage {...props} />);
}

describe('ErrorMessage', () => {
  it('displays the error message', () => {
    const error = 'Network Error';
    renderErrorMessage({ props: { error, onRetry: vi.fn() } });

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('displays the retry button', () => {
    renderErrorMessage({});

    expect(
      screen.getByRole('button', { name: /retry the request/i })
    ).toBeInTheDocument();
  });

  describe('buttin is clicked', () => {
    it('calls onRetry when the button is clicked', () => {
      const error = 'Network error';
      const onRetry = vi.fn();
      renderErrorMessage({ props: { error, onRetry } });

      fireEvent.click(
        screen.getByRole('button', { name: /retry the request/i })
      );

      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });
});
