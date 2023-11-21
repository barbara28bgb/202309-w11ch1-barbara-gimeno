import { type Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { type UserCredentialStructure } from "../types";
import type UserMoongoseRepository from "../repository/UserMoongoseRepository";

const secretKey = process.env.JWT_SECRET_KEY;
class UserController {
  constructor(private readonly userRepository: UserMoongoseRepository) {}

  loginUser = async (
    req: UserCredentialStructure,
    res: Response,
  ): Promise<void> => {
    const { username, password } = req.body;

    try {
      const user = await this.userRepository.getUser(username, password);
      const userData: JwtPayload = {
        sub: user._id,
        name: user.name,
      };

      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!, {
        expiresIn: "2d",
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: "Wrong credentials" });
    }
  };
}

export default UserController;
