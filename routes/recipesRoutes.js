import express from "express";
import { getRecipe } from "../models/recipes.js";
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

export default router;
