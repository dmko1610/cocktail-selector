import { create } from 'zustand';

export interface Drink {
  drinkId: string;
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
  fetchCocktails: (code: string) => Promise<void>;
}

export const useCocktailStore = create<CocktailStore>((set) => ({
  data: {},
  fetchCocktails: async (code) => {
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
      );
      const json = await res.json();
      if (!json.drinks) throw new Error('No drinks found');

      set((state) => ({
        data: { ...state.data, [code]: json.drinks },
      }));
    } catch (e) {
      console.error('Error occured: ', e);
    }
  },
}));
