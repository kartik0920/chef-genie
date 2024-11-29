import stringToHtml from "string-to-html";

export default function Recipe(props) {
  const X = stringToHtml(props.recipe);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.recipe }}
      className="suggested-recipe-container"
      ref={props.ref}
    />
  );
}
