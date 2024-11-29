import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT_1 = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in html to make it easier to render to a web page
`;

const SYSTEM_PROMPT_2 = `
You are an assistant that receives a name of dish from a user and suggests a recipe to that dish. You don't need to use every ingredient they mention in your recipe. The recipe can include  ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in html to make it easier to render to a web page
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);
export async function getRecipeFromMistral(ingredientsArr, setLoading) {
  setLoading((x) => !x);
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT_1 },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  } finally {
    setLoading((x) => !x);
  }
}

export async function getRecipeFromName(dishName, setLoading) {
  setLoading((x) => !x);

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT_2 },
        {
          role: "user",
          content: `I want to make a ${dishName}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  } finally {
    setLoading((x) => !x);
  }

  // setLoading(true);
}
