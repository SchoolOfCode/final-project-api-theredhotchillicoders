import express from "express";
import path from "path";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import ActivitiesRouter from "./routes/activities.js";
import wellbeingRouter from "./routes/wellbeing.js";
import usersRouter from "./routes/users.js";
import firebaseAuth from "./middleware/firebaseAuth.js";
import recipesRouter from "./routes/recipesRoutes.js"

//changed to activities
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Firebase auth middleware checks which user is currently logged in updating req with user (req.user) which can be used in routes
app.use(firebaseAuth);

app.use("/activities", ActivitiesRouter);
app.use("/wellbeing", wellbeingRouter);
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

//Note server runs on port 3001 locally
export default app;
