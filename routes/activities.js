import express from "express";
import { getAllActivities, createData, deleteTaskById } from "../models/activities.js";
//changed to activities

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const activities = await getAllActivities();

  res.json({
    success: true,
    payload: activities,
  });
});

router.post("/", async function (req, res, next) {
  const body = req.body;
  const create = await createData(body);

  res.json({
    success: true,
    payload: create,
  });
});

router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  const remove = await deleteTaskById(id)
  console.log(id);
  res.json({
    success: true,
    payload: remove,
  });

  // deleteTaskById(id);
});

export default router;
