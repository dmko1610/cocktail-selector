import { render, screen } from '@testing-library/react';
import DrinkCard from './DrinkCard';

const mockDrink = {
  idDrink: '12345',
  strDrink: 'Mojito',
  strCategory: 'Cocktail',
  strAlcoholic: 'Alcoholic',
  strGlass: 'Highball glass',
  strInstructions: 'Mix ingredients with ice, serve chilled.',
  strDrinkThumb: 'https://example.com/mojito.jpg',
  strIngredient1: 'Rum',
  strMeasure1: '50ml',
  strIngredient2: 'Mint',
  strMeasure2: '5 leaves',
  strIngredient3: 'Soda Water',
  strMeasure3: 'Top up',
  strIngredient4: null,
  strMeasure4: null,
};

describe('DrinkCard', () => {
  it('displays drink details', () => {
    render(<DrinkCard drink={mockDrink} />);

    expect(
      screen.getByRole('heading', { name: /mojito/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Cocktail/)).toBeInTheDocument();
    expect(screen.getByText(/Alcoholic/)).toBeInTheDocument();
    expect(screen.getByText(/Glass:/)).toBeInTheDocument();
    expect(screen.getByText(/Highball glass/)).toBeInTheDocument();
    expect(screen.getByText(/Instructions:/)).toBeInTheDocument();
    expect(screen.getByText(/Mix ingredients with ice/)).toBeInTheDocument();
  });

  it('displays ingredients list', () => {
    render(<DrinkCard drink={mockDrink} />);

    expect(screen.getByText(/50ml Rum/)).toBeInTheDocument();
    expect(screen.getByText(/5 leaves Mint/)).toBeInTheDocument();
    expect(screen.getByText(/Top up Soda Water/)).toBeInTheDocument();
  });

  it('displays drink image with alt', () => {
    render(<DrinkCard drink={mockDrink} />);

    const img = screen.getByRole('img', { name: /mojito/i });
    expect(img).toHaveAttribute('src', mockDrink.strDrinkThumb);
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
