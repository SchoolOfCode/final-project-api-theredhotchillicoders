import express from "express";
import { getWellbeing } from "../models/wellbeing.js";

const router = express.Router();

/* GET wellbeing activities. */
router.get("/", async function (req, res, next) {
  const wellbeing = await getWellbeing();

  res.json({
    success: true,
    payload: wellbeing,
  });
});

export default router;
