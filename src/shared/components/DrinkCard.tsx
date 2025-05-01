import { Drink } from '../../store/cocktailStore';

export default function DrinkCard({ drink }: { drink: Drink }) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (!ingredient) break;
    ingredients.push({ ingredient, measure });
  }

  return (
    <div>
      <div>
        <h2>{drink.strDrink}</h2>
        <p>
          {drink.strCategory} / {drink.strAlcoholic}
        </p>
        <p>
          <strong>Glass:</strong> {drink.strGlass}
        </p>
        <p>
          <strong>Instructions:</strong> {drink.strInstructions}
        </p>
        <p>
          <strong>Ingredients:</strong>
        </p>
        <ul>
          {ingredients.map((item, i) => (
            <li key={i}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <img src={drink.strDrinkThumb} alt={drink.strDrink} loading="lazy" />
      </div>
    </div>
  );
}
