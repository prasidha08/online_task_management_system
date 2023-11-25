import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../../helpers/errorHandler";
import { db } from "../..";
import { COLLECTION_NAMES } from "../../helpers/collectionName";
import { TRequestCategory } from "./category.interface";
import { STATUS_CODE } from "../../helpers/statusCode";
import { ObjectId } from "mongodb";

const { SUCCESS, CONFLICT, BAD_REQUEST } = STATUS_CODE;

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories: TRequestCategory = {
    ...req.body,
    updatedAt: null,
    createdAt: Date.now(),
    userIds: req.body.userIds ?? null,
    taskIds: null,
  };

  const categoriesCollection = db().collection(COLLECTION_NAMES.CATEGORIES);

  try {
    const existedCategory = await categoriesCollection.findOne({
      title: categories.title,
    });

    if (!existedCategory) {
      const category = await categoriesCollection.insertOne(categories);
      res.status(SUCCESS).json({
        success: true,
        data: { ...categories, _id: category.insertedId },
        message: "Successfully created.",
      });
      return;
    }
    next(new ErrorHandler(`${categories.title} already exists.`, CONFLICT));
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;

  const categoriesCollection = db().collection(COLLECTION_NAMES.CATEGORIES);

  try {
    const response = await categoriesCollection.findOne({
      _id: new ObjectId(categoryId),
    });

    if (!response) {
      throw new ErrorHandler("Category not found");
    }

    if (response.taskIds !== null) {
      throw new ErrorHandler(
        "Cannot delete project because it has associated tasks.",
        BAD_REQUEST
      );
    }
    res
      .status(200)
      .json({ message: "Successfully deleted category", success: true });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;

  const categoryToUpdate = {
    ...req.body,
    updatedAt: Date.now(),
  };

  const categoriesCollection = db().collection(COLLECTION_NAMES.CATEGORIES);
  try {
    const response = await categoriesCollection.findOneAndUpdate(
      {
        _id: new ObjectId(categoryId),
      },
      { $set: categoryToUpdate }
    );

    if (!response) {
      throw new ErrorHandler("Category not found");
    }

    res.status(200).json({
      message: "Successfully updated category",
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const controllers = {
  createCategory,
  updateCategory,
  deleteCategory,
};
