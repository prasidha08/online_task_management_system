import { NextFunction, Request, Response } from "express";
import { categoryModel } from "./category.schema";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = new categoryModel();
    await doc.save();

    res.send("success");
  } catch (error) {}
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};

export const controllers = {
  createCategory,
  updateCategory,
};
