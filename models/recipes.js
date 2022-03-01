import fetch from "node-fetch";
const apiKey = process.env.RECIPE_API_KEY;

export async function getRecipe(recipe) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&sort=popularity&number=6`, //&apiKey=${apiKey}
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  //Returns a list of recipes
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getRecipeDetails(recipeID) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  //Returns details for a single recipe
  const data = await res.json();
  console.log(data);
  return data;
}
