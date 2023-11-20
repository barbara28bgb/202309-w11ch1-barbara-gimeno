export interface UserWithoutPassword {
  _id: string;
  name: string;
  username: string;
}

export interface UserStructure extends UserWithoutPassword {
  password: string;
}

export type UserDataStructure = Omit<UserStructure, "_id">;
