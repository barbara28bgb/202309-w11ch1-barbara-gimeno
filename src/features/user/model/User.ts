import { Schema, model } from "mongoose";
import { type UserStructure } from "../types.js";

const userSchema = new Schema<UserStructure>({
  name: {
    type: String,
    required: true,
  },
  username: {
    types: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
