import fetch from "node-fetch";

export async function getRecipe(recipe) {
  const apiKey = process.env.RECIPE_API_KEY;
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&sort=popularity&number=6`, //&apiKey=${apiKey}
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
}
