import React from "react";
import Recipe from "./Recipe";
import IngredientList from "./ingredientList";
import { getRecipeFromMistral, getRecipeFromName } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [dish, Setdish] = React.useState(null);

  function addItem(event) {
    const item = event.get("list-ingredient");
    setIngredients((x) => [...x, item]);
  }

  async function addDish(e) {
    const name = e.get("dishName");
    Setdish(name);
    const recipeFromAi = await getRecipeFromName(name);
    console.log(recipeFromAi);
    setRecipe(recipeFromAi);
  }

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  async function getRecipe() {
    const recipefromAi = await getRecipeFromMistral(ingredients);
    setRecipe(recipefromAi);
  }

  return (
    <main>
      <div className="intro">
        <p>
          Add the list of Available ingredients or Name of a Dish and Let us
          make the recipe for you
        </p>
      </div>

      {dish === null && (
        <section className="fromIngredient">
          <form className="input-form" action={addItem}>
            <input
              aria-label="Add ingredient"
              type="text"
              name="list-ingredient"
              placeholder="e.g. oregano"
            />
            <button type="submit">+ Add Ingredient</button>
          </form>

          <section>
            <IngredientList
              list={ingredientsListItems}
              addItem={addItem}
              generateRecipe={getRecipe}
            />
          </section>
        </section>
      )}

      <section className="fromDish">
        {ingredients.length === 0 && (
          <section>
            {dish === null && (
              <div className="intro">
                <h3>OR</h3>
              </div>
            )}

            <form className="input-form" action={addDish}>
              <input
                aria-label="Add dish name"
                type="text"
                name="dishName"
                placeholder="e.g. Pav-bhaji"
              />
              <button type="submit">+ Add Dish name</button>
            </form>
          </section>
        )}
      </section>
      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}
