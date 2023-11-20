import { type UserDataStructure, type UserWithoutPassword } from "../types";

export interface UserRepository {
  createUser(userData: UserDataStructure): Promise<UserWithoutPassword>;
  getUser(username: string, password: string): Promise<UserWithoutPassword>;
}
