import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { registerUser } from "../controlleres/user/registerUser";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userValidator";
import { validationResult } from "express-validator";
import { checkCredentials } from "../controlleres/user/checkCredentials";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getAccount } from "../controlleres/user/getAccount";

const router = express.Router();

router.post(
  "/register",
  registerUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).send({
          message: "validation error",
          error: { errors: error.array() },
        });
      }

      const result = await registerUser(name, email, password);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  loginUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).send({
          message: "validation error",
          error: { errors: error.array() },
        });
      }
      const user = await checkCredentials(email, password);

      if (!user) {
        return res.status(400).send({
          message: "Invalid credentials.",
        });
      }
      req.session.userId = user.data?.id;

      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", isAuthenticated, (req: Request, res: Response) => {
  req.session.userId = undefined;

  res.send({
    message: "Logout successfully.",
    success: true,
  });
});

router.get("/account", isAuthenticated, async (req: Request, res: Response) => {
  const result = await getAccount(req.session.userId);
  res.send(result);
});

export { router as userRouter };
