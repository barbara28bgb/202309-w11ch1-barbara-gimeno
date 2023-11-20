import { Router } from "express";
import UserMoongoseRepository from "../repository/UserMoongoseRepository";
import UserController from "../controller/UserController";

export const userRouter = Router();

const userRepository = new UserMoongoseRepository();
const userController = new UserController(userRepository);

userRouter.post("/login", userController.loginUser);
