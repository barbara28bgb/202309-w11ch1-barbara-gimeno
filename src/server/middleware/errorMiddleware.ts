import { type NextFunction, type Request, type Response } from "express";
import { type CustomError } from "../CustomError/CustomError";
import debugCreator from "debug";

const debug = debugCreator("robots:server:middleware:errorMiddleware");

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Emdpoint not found" });
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(error.privateMassage);
  res.status(404).json({ error: error.message });
};
