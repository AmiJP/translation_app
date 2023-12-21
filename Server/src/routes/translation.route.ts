import express, { Response, Request, NextFunction } from "express";
import { createGroup } from "../controlleres/translation/createGroup";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { deleteGroup } from "../controlleres/translation/deleteGroup";
import { getGroup } from "../controlleres/translation/getGroup";
import { createTranslation } from "../controlleres/translation/createtranslation";
import { getTranslation } from "../controlleres/translation/getTranslation";
import { deleteallGroup } from "../controlleres/translation/deleteAllGroup";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as number;
      const result = await createGroup(userId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as number;
      const groupId = Number(req.params.id);
      const result = await deleteGroup(groupId, userId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as number;
      const result = await getGroup(userId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = Number(req.params.id);
      const { original_text, language } = req.body;

      const result = await createTranslation(original_text, language, groupId);

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = Number(req.params.id);
      const result = await getTranslation(groupId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteallGroup();
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router as groupRouter };
