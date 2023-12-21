import { Request, Response, NextFunction } from "express";

export function errorhandler(
  req: Request,
  res: Response,
  next: NextFunction,
  err: Error
) {
  res.status(500).send({
    message: err.message,
    success: false,
  });
}
