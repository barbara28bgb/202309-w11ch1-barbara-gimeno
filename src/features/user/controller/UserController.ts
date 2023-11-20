import { type Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { type UserCredentialStructure } from "../types";
import type UserMoongoseRepository from "../repository/UserMoongoseRepository";

class UserController {
  constructor(private readonly userRepository: UserMoongoseRepository) {}

  loginUser = async (req: UserCredentialStructure, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await this.userRepository.getUser(username, password);
      const userData: JwtPayload = { sub: user._id, name: user.name };
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!);

      res.status(200).json({ token: { token } });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}

export default UserController;
