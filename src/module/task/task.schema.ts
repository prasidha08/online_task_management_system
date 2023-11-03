import mongoose from "mongoose";

const Label = {
  PRIORITY: "PRIORITY",
} as const;

const Status = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
};

const taskSchema = new mongoose.Schema({
  label: Label,
  title: String,
  status: Status,
  createdAt: Number,
  createdBy: Number,
  categoryId: String,
  description: String,
  userIds: [String], // these are the person who can see the tasks
  estimatedHr: Number,
  updatedAt: [Number],
  updatedBy: [String],
  taskCompletedHr: Number,
});

export const taskModel = mongoose.model("task", taskSchema);
