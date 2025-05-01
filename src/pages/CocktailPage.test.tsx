import { useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { Drink, useCocktailStore } from '../store/cocktailStore';
import { render, screen } from '@testing-library/react';
import CocktailPage from './CocktailPage';
import { mockDrink } from '../mocks/mockDrink';

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
});
