import { useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { Drink, useCocktailStore } from '../store/cocktailStore';
import { render, screen } from '@testing-library/react';
import CocktailPage from './CocktailPage';
import { mockDrink } from '../mocks/mockDrink';
import { renderWithRouter } from '../test-utils';

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

vi.mock('../store/cocktailStore', () => ({ useCocktailStore: vi.fn() }));

vi.mock('../shared/components/DrinkCard', () => ({
  default: ({ drink }: Drink) => <div>Mocked Drink Card {drink.strDrink}</div>,
}));

describe('CocktailPage', () => {
  it('fetches data if data is not persist in store', () => {
    (useParams as any).mockReturnValue({ code: 'mojito' });
    const fetchCocktails = vi.fn();
    (useCocktailStore as any).mockReturnValue({ data: {}, fetchCocktails });
    render(<CocktailPage />);

    expect(fetchCocktails).toHaveBeenCalledWith('mojito');
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays drink cards when data is available', () => {
    (useParams as any).mockReturnValue({ code: 'mojito' });
    const fetchCocktails = vi.fn();
    (useCocktailStore as any).mockReturnValue({
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
      (useParams as any).mockReturnValue({ code: 'mojito' });
      const fetchCocktails = vi.fn();
      (useCocktailStore as any).mockReturnValue({
        data: { mojito: [] },
        fetchCocktails,
      });
      render(<CocktailPage />);

      expect(screen.getByText(/no drinks found/i)).toBeInTheDocument();
    });
  });

  describe('when error in store occured', () => {
    it('displays error message', () => {
      (useParams as any).mockReturnValue({ code: 'mojito' });
      const fetchCocktails = vi.fn();
      (useCocktailStore as any).mockReturnValue({
        data: {},
        error: 'API error',
        fetchCocktails,
      });
      render(<CocktailPage />);

      expect(screen.getByText(/error: api error/i)).toBeInTheDocument();
    });
  });

  describe('when code invalid', () => {
    it('redirects to not found page', () => {
      (useParams as any).mockReturnValue({ code: 'invalid' });
      const fetchCocktails = vi.fn();
      (useCocktailStore as any).mockReturnValue({
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
