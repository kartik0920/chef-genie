import React from "react";
import Recipe from "./Recipe";
import IngredientList from "./ingredientList";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");

  function addItem(event) {
    const item = event.get("list-ingredient");
    setIngredients((x) => [...x, item]);
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
          Add the list of Available ingredients and Let us make the recipe for
          you
        </p>
      </div>
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
        {recipe && <Recipe recipe={recipe} />}
      </section>
    </main>
  );
}
