import { useParams } from 'react-router-dom';
import { useCocktailStore } from '../store/cocktailStore';
import { useEffect } from 'react';
import DrinkCard from '../shared/components/DrinkCard';

export default function CocktailPage() {
  const { code } = useParams();
  const { data, fetchCocktails } = useCocktailStore();

  useEffect(() => {
    if (code && !data[code!]) {
      fetchCocktails(code!);
    }
  }, [code]);

  const drinks = data[code || ''];

  if (!drinks) return <div>Loading...</div>;

  return (
    <div>
      {drinks.map((drink) => (
        <DrinkCard drink={drink} />
      ))}
    </div>
  );
}
