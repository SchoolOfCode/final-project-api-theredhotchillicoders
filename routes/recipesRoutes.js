import express from "express";
import { getRecipe, getRecipeDetails } from "../models/recipes.js";
//changed to activities

const router = express.Router();

/* GET all recipes. */
router.post("/search", async function (req, res, next) {
  const recipes = await getRecipe(req.body.recipes);
  res.json({
    success: true,
    payload: recipes,
  });
});

/* GET details for a specific recipe */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const recipe = await getRecipeDetails(id);
  res.json({
    success: true,
    payload: recipe,
  });
});

export default router;
