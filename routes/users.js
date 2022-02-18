import express from "express";
import { getAllUsers, createData } from "../models/users.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await getAllUsers();

  res.json({
    success: true,
    payload: users,
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
