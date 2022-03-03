import fetch from "node-fetch";
const apiKey = process.env.RECIPE_API_KEY;
const appID = process.env.RECIPE_APP_ID;

export async function getRecipe(recipe) {
  const res = await fetch(
    `https://api.edamam.com/api/recipes/v2?app_key=${apiKey}&app_id=${appID}&type=public&q=${recipe}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  //Returns a list of recipes
  const data = await res.json();
  console.log(data.hits);
  return data.hits.map((recipe) => recipe.recipe);
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
