import { useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { Drink, useCocktailStore } from '@/store/cocktailStore';
import { render, screen } from '@testing-library/react';
import CocktailPage from '@/pages/CocktailPage';
import { mockDrink } from '@/mocks/mockDrink';
import { renderWithRouter } from '@/test-utils';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useParams: vi.fn(),
  };
});
vi.mock('../../store/cocktailStore', () => ({ useCocktailStore: vi.fn() }));
vi.mock('../../shared/components/DrinkCard', () => ({
  default: ({ drink }: { drink: Drink }) => (
    <div>Mocked Drink Card {drink.strDrink}</div>
  ),
}));
vi.mock('../../shared/components/ErrorMessage', () => ({
  default: () => <div role="error_message">Mocked Error Message</div>,
}));

describe('CocktailPage', () => {
  it('fetches data if data is not persist in store', () => {
    (useParams as jest.Mock).mockReturnValue({ code: 'mojito' });
    const fetchCocktails = vi.fn();
    (useCocktailStore as unknown as jest.Mock).mockReturnValue({
      data: {},
      fetchCocktails,
    });
    render(<CocktailPage />);

    expect(fetchCocktails).toHaveBeenCalledWith('mojito');
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays drink cards when data is available', () => {
    (useParams as jest.Mock).mockReturnValue({ code: 'mojito' });
    const fetchCocktails = vi.fn();
    (useCocktailStore as unknown as jest.Mock).mockReturnValue({
      data: {
        mojito: [mockDrink],
      },
      fetchCocktails,
    });
    render(<CocktailPage />);

    expect(fetchCocktails).not.toHaveBeenCalled();
    expect(screen.getByText(/Mocked Drink Card Mojito/i)).toBeInTheDocument();
  });

  describe('when the list is empty', () => {
    it("displays 'No drinks found' message", () => {
      (useParams as jest.Mock).mockReturnValue({ code: 'mojito' });
      const fetchCocktails = vi.fn();
      (useCocktailStore as unknown as jest.Mock).mockReturnValue({
        data: { mojito: [] },
        fetchCocktails,
      });
      render(<CocktailPage />);

      expect(screen.getByText(/no drinks found/i)).toBeInTheDocument();
    });
  });

  describe('when error occured', () => {
    it('displays the error', () => {
      (useParams as jest.Mock).mockReturnValue({ code: 'mojito' });
      const fetchCocktails = vi.fn();
      (useCocktailStore as unknown as jest.Mock).mockReturnValue({
        data: {},
        error: 'Failed to fetch',
        fetchCocktails,
      });
      render(<CocktailPage />);

      expect(screen.getByRole('error_message')).toBeInTheDocument();
    });

    describe('retry button is clicked', () => {
      it.skip('throttles retry cicks', async () => {
        vi.useFakeTimers();
        (useParams as jest.Mock).mockReturnValue({ code: 'mojito' });
        const fetchCocktails = vi.fn();
        (useCocktailStore as unknown as jest.Mock).mockReturnValue({
          data: {},
          error: 'Network error',
          fetchCocktails,
        });
        render(<CocktailPage />);
        const button = screen.getByRole('button', { name: /retry/i });

        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);
        vi.advanceTimersByTime(3000);

        vi.runAllTimers();
        expect(fetchCocktails).toHaveBeenCalledTimes(1);

        vi.useRealTimers();
      });
    });
  });

  describe('when code invalid', () => {
    it('redirects to not found page', () => {
      (useParams as jest.Mock).mockReturnValue({ code: 'invalid' });
      const fetchCocktails = vi.fn();
      (useCocktailStore as unknown as jest.Mock).mockReturnValue({
        data: {},
        fetchCocktails,
      });
      renderWithRouter(<CocktailPage />, {
        initialEntries: ['/invalid'],
        routes: [
          { path: '/:code', element: <CocktailPage /> },
          { path: '/404', element: <div>Mock 404</div> },
        ],
      });

      expect(screen.getByText(/mock 404/i)).toBeInTheDocument();
    });
  });
});
