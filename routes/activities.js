import express from "express";
import {
  getAllActivities,
  createData,
  deleteTaskById,
  getActivitiesByUser,
  changeComplete,
} from "../models/activities.js";
//changed to activities

const router = express.Router();

/* GET all activities. */
router.get("/", async function (req, res, next) {
  const activities = await getAllActivities();

  res.json({
    success: true,
    payload: activities,
  });
});

/* GET activities for a SPECIFIC user */
router.get("/user", async function (req, res, next) {
  const userID = req.user.uid;
  const activities = await getActivitiesByUser(userID);
  res.json({
    success: true,
    payload: activities,
  });
});

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const create = await createData(body);

    res.json({
      success: true,
      payload: create,
    });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  const remove = await deleteTaskById(id);
  res.json({
    success: true,
    payload: remove,
  });

  // deleteTaskById(id);
});

router.patch("/:id", async function (req, res, next) {
  const id = req.params.id;
  const body = req.body;
  const complete = await changeComplete(id, body);
  res.json({
    success: true,
    payload: complete,
  });

  // deleteTaskById(id);
});

export default router;

//
