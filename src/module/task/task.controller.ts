import { NextFunction, Request, Response } from "express";
import { db } from "../..";
import { COLLECTION_NAMES } from "../../helpers/collectionName";
import { ObjectId } from "mongodb";

export const addTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const task = {
    ...req.body,
    updatedAt: null,
    createdAt: Date.now(),
  };
  try {
    const response = await db()
      .collection(COLLECTION_NAMES.TASKS)
      .insertOne(task);

    await db()
      .collection(COLLECTION_NAMES.CATEGORIES)
      .updateOne(
        { _id: new ObjectId(task.categoryId) },
        { $push: { taskIds: response.insertedId } }
      );

    res.status(200).json({
      success: true,
      message: "Task created successfully.",
      data: { ...task, _id: response.insertedId },
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;

  const taskCollection = db().collection(COLLECTION_NAMES.TASKS);

  try {
    const tasks = taskCollection.find({ categoryId });
    console.log("🚀 ~ file: task.controller.ts:50 ~ tasks:", tasks);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};
