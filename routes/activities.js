import express from 'express';
import { getAllActivities, createData } from '../models/activities.js';
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

export default router;
