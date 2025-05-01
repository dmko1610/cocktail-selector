import { create } from 'zustand';

export interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: any;
}

interface CocktailStore {
  data: Record<string, Drink[]>;
  error: string | null;
  fetchCocktails: (code: string) => Promise<void>;
}

export const useCocktailStore = create<CocktailStore>((set) => ({
  data: {},
  error: null,
  fetchCocktails: async (code) => {
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
      );
      const json = await res.json();

      set((state) => ({
        data: { ...state.data, [code]: json.drinks },
        error: null,
      }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },
}));
