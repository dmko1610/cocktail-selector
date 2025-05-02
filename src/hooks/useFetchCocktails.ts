import { fetchCocktailsFromAPI } from '@/services/api';
import { useCocktailStore } from '@/store/cocktailStore';

export const useFetchCocktails = () => {
  const { setData, setError, data, error } = useCocktailStore();

  const fetchCocktails = async (code: string) => {
    if (data[code]) return;

    try {
      const drinks = await fetchCocktailsFromAPI(code);
      setData(code, drinks);
    } catch (e) {
      const message =
        (e as Error).message === 'Failed to fetch'
          ? 'Server is unavailable. VPN may be required or there may be no internet connection'
          : (e as Error).message;
      setError(message);
    }
  };

  return { fetchCocktails, data, error };
};
