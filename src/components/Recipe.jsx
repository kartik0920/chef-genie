import stringToHtml from "string-to-html";

export default function Recipe(props) {
  const X = stringToHtml(props.recipe);
  console.log(X);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.recipe }}
      className="suggested-recipe-container"
    />
  );
}
