import mongoose from "mongoose";

const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const userSchema = new mongoose.Schema({
  role: Role,
  name: String,
  email: String,
  address: String,
  password: String,
  createdAt: Number,
  updatedAt: Number,
  phoneNumber: String,
});

export const userModel = mongoose.model("category", userSchema);
