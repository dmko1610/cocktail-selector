import { create } from 'zustand';

import { Drink } from '@/entities/drink/types';

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
