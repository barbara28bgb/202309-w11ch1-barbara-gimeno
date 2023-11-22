import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";
import robotsRouter from "../features/robot/router/robotsRouter.js";
import { userRouter } from "../features/user/router/userRoutre.js";
import { generalError, notFound } from "./middleware/errorMiddleware.js";

app.use(express.json());

app.use(morgan("dev"));

app.use(cors({ origin: "*" }));

app.use(notFound);

app.use(generalError);

app.use("/robots", robotsRouter);

app.use("/users", userRouter);

app.use("/", pingRouter);
