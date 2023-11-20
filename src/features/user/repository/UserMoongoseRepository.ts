import User from "../model/User";
import { type UserDataStructure, type UserWithoutPassword } from "../types";
import { type UserRepository } from "./types";
import bcrypt from "bcrypt";

class UserMoongoseRepository implements UserRepository {
  async createUser(userData: UserDataStructure): Promise<UserWithoutPassword> {
    const newUser = await User.create(userData);

    const { password, ...newUserWithoutPassword } = newUser.toJSON();

    return newUserWithoutPassword;
  }

  async getUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("User not found");
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Wrong password");
      }

      return user;
    } catch (error) {
      throw new Error("Error creating user:" + (error as Error).message);
    }
  }
}

export default UserMoongoseRepository;
