import express from "express";
import { getAllUsers, createUser, deleteUserById } from "../models/users.js";

const router = express.Router();

/* GET wellbeing activities. */
router.get("/", async function (req, res, next) {
  const users = await getAllUsers();

  res.json({
    success: true,
    payload: users,
  });
});

router.post("/", async function (req, res, next) {
  const body = req.body;
  const create = await createUser(body);

  res.json({
    success: true,
    payload: create,
  });
});

router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  const remove = await deleteUserById(id);
  console.log(id);
  res.json({
    success: true,
    payload: remove,
  });

  // deleteTaskById(id);
});

export default router;
