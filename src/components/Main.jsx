import React from "react";
import Recipe from "./Recipe";
import IngredientList from "./ingredientList";
import { getRecipeFromMistral, getRecipeFromName } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [dish, Setdish] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  function addItem(event) {
    const item = event.get("list-ingredient");
    setIngredients((x) => [...x, item]);
  }

  async function addDish(e) {
    const name = e.get("dishName");
    Setdish(name);
    const recipeFromAi = await getRecipeFromName(name, setLoading);
    // setRecipe(recipeFromAi);
  }

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  async function getRecipe() {
    const recipefromAi = await getRecipeFromMistral(ingredients, setLoading);
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
              required
            />
            <button type="submit" disabled={loading}>
              + Add Ingredient
            </button>
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
              <button type="submit" disabled={loading}>
                + Add Dish name
              </button>
            </form>
          </section>
        )}
      </section>

      {loading && <div className="spinner" />}
      {recipe && <Recipe recipe={recipe} />}

      <style>{`
        .spinner {
          margin: 20px auto;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
