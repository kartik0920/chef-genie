export default function IngredientList(props) {
  const newItem = props.list;
  const getRecipe = props.generateRecipe;
  return (
    <section>
      {newItem.length != 0 && <h2>Ingredient on Hand :</h2>}
      <ul>{newItem}</ul>
      {newItem.length >= 3 ? (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>
            {!props.getRecipe ? "Get" : "Hide"} a recipe
          </button>
        </div>
      ) : null}
    </section>
  );
}
