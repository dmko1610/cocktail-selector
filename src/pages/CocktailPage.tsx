import { Navigate, useParams } from 'react-router-dom';
import { useCocktailStore } from '@/store/cocktailStore';
import { useEffect } from 'react';
import DrinkCard from '@/shared/components/DrinkCard';
import { VALID_CODES } from '@/constants';

export default function CocktailPage() {
  const { code } = useParams();
  const { data, error, fetchCocktails } = useCocktailStore();

  if (!code || !VALID_CODES.includes(code)) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    if (code && !data[code!]) {
      fetchCocktails(code!);
    }
  }, [code]);

  if (error) return <div>Error: {error}</div>;

  const drinks = data[code || ''];

  if (!drinks) return <div>Loading...</div>;
  if (drinks.length === 0) return <div>No drinks found.</div>;

  return (
    <div className="drinks">
      {drinks.map((drink) => (
        <DrinkCard key={drink.idDrink} drink={drink} />
      ))}
    </div>
  );
}
