import { NextFunction, Request, Response } from "express";
import validation from "./category.validation";
import { STATUS_CODE } from "../../helpers/statusCode";

const { BAD_REQUEST } = STATUS_CODE;

const { addCategoryValidation, deleteCategoryValidation } = validation;

export const validateAddCategory = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  // const response = addCategoryValidation.body.validate(req.body);
  // console.log("🚀 ~ file: category.middleware.ts:15 ~ response:", response);
  // if (response.error) {
  //   return next({
  //     status: BAD_REQUEST,
  //     message: response.error?.message,
  //   });
  // }
  // return next();
  return next();
};

export const validateDeleteCategory = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const response = deleteCategoryValidation.params.validate(req.params);

  if (response.error) {
    return next({
      status: BAD_REQUEST,
      message: response.error?.message,
    });
  }
  next();
};
