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
  const response = addCategoryValidation.body.validate(req.body);
  const response2 = addCategoryValidation.params.validate(req.params);

  if (response.error || response2.error) {
    return next({
      status: BAD_REQUEST,
      message: response.error?.message ?? response2.error?.message,
    });
  }

  next();
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
