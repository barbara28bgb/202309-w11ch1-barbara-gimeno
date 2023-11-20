import { type Request } from "express";
export interface UserWithoutPassword {
  _id: string;
  name: string;
  username: string;
}

export interface UserStructure extends UserWithoutPassword {
  password: string;
}

export type UserDataStructure = Omit<UserStructure, "_id">;

export type UserCredentialStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;
