import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import DrinkCard from '@/entities/drink/ui/DrinkCard/DrinkCard';
import { VALID_CODES } from '@/constants';
import throttle from 'lodash.throttle';
import { useFetchCocktails } from '@/shared/hooks/useFetchCocktails';
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage';

export default function CocktailPage() {
  const { code } = useParams();
  const { data, error, fetchCocktails } = useFetchCocktails();

  if (!code || !VALID_CODES.includes(code)) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    if (code && !data[code!]) {
      fetchCocktails(code!);
    }
  }, [code]);

  const refetch = () => {
    fetchCocktails(code);
  };
  const throttleRefetch = useMemo(() => throttle(refetch, 3000), [refetch]);

  if (error) return <ErrorMessage error={error} onRetry={throttleRefetch} />;

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
