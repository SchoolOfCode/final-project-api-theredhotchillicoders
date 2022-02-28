import fetch from "node-fetch";

export async function getRecipe(recipe) {
    const apiKey = process.env.RECIPE_API_KEY;
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&sort=popularity&number=6`, {
        method: 'GET',
        body: JSON.stringify(recipe),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    console.log(data);

    return data;
}

