import "dotenv/config";
import { type Response } from "express";
import jwt from "jsonwebtoken";
import {
  type UserCredentialStructure,
  type UserWithoutPassword,
} from "../types";
import type UserMoongoseRepository from "../repository/UserMoongoseRepository.js";
import UserController from "./UserController";
import { type UserRepository } from "../repository/types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UsersController's loginUser method", () => {
  const req: Pick<UserCredentialStructure, "body"> = {
    body: {
      username: "TunoMami",
      password: "QueEsEsaPiedraDelCielo",
    },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When it receives a request with a validated password and a username", () => {
    const expectedStatusCode = 200;
    const userData: UserWithoutPassword = {
      _id: "",
      name: "",
      username: "TunoMami",
    };

    const userRepository: UserRepository = {
      getUser: jest.fn().mockResolvedValue(userData),
      createUser: jest.fn(),
    };

    const token = "AHRTPIUHQR3PTIUY53PNTY";
    jwt.sign = jest.fn().mockReturnValue(token);

    test("Then it should call the status method of the response with status code 200", async () => {
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const userController = new UserController(userRepository);
      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the JSON method of the response with the token 'AHRTPIUHQR3PTIUY53PNTY'", async () => {
      const userController = new UserController(userRepository);

      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith({ token: { token } });
    });
  });
  describe("When it receives a request with an invalidated password and username", () => {
    const expectedWrongStatusCode = 401;

    const userRepository: UserRepository = {
      getUser: jest.fn().mockRejectedValue("User not found"),
      createUser: jest.fn(),
    };
    const userController = new UserController(userRepository);

    const token = "AHRTPIUHQR3PTIUY53PNTY";
    jwt.sign = jest.fn().mockReturnValue({ token });

    test("Then it should call the status method of the response with status code 401", async () => {
      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedWrongStatusCode);
    });

    test("Then it should call the json method of the response with an error message", async () => {
      const expectedErrorMessage = {
        error: "Wrong credentials",
      };

      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
