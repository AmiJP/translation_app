import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./src/data-source";
import morgan from "morgan";
import { userRouter } from "./src/routes/user.route";
import session from "express-session";
import { groupRouter } from "./src/routes/translation.route";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

AppDataSource.initialize()
  .then(() => {
    console.log("database connected.");
  })
  .catch((error) => console.log(error));

app.use(
  session({
    secret: "ami",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/user", userRouter);
app.use("/group", groupRouter);

app.listen(4000, () => {
  console.log("server running on port 4000.");
});
