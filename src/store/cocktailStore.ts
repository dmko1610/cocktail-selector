import { create } from 'zustand';

export interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string | null;
}

interface CocktailStore {
  data: Record<string, Drink[]>;
  error: string | null;
  setData: (code: string, drinks: Drink[]) => void;
  setError: (error: string | null) => void;
}

export const useCocktailStore = create<CocktailStore>((set) => ({
  data: {},
  error: null,
  setData: (code, drinks) =>
    set((state) => ({
      data: { ...state.data, [code]: drinks },
      error: null,
    })),
  setError: (error) => set({ error }),
}));
