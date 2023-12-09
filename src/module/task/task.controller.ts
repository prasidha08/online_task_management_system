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
        // TODO: this is not working..
        {
          $cond: {
            if: { $eq: [{ $type: "$taskIds" }, "null"] }, // Check if taskIds is null
            then: {
              $set: {
                taskIds: [response.insertedId], // If null, set taskIds as an array containing response.insertedId
              },
            },
            else: {
              $push: {
                taskIds: response.insertedId, // If taskIds is an array, push response.insertedId to it
              },
            },
          },
        }
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
    const tasks = await taskCollection.find({ categoryId }).toArray();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};
