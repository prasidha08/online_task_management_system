import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: String,
  userIds: [String], // only the user mentioned in here can view category,
  createdBy: String,
  createdAt: Number,
  updatedAt: Number,
});

export const categoryModel = mongoose.model("category", categorySchema);
