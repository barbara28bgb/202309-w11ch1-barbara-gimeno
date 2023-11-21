import { Router } from "express";
import UserMoongoseRepository from "../repository/UserMoongoseRepository.js";
import UserController from "../controller/UserController.js";

export const userRouter = Router();

const userRepository = new UserMoongoseRepository();
const userController = new UserController(userRepository);

userRouter.post("/login", userController.loginUser);
