import { Drink } from "@/entities/drink/types";

export async function fetchCocktailsFromAPI(code: string): Promise<Drink[]> {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json = await res.json();

  return json.drinks;
}
