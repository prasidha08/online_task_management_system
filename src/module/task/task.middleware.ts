import ErrorHandler from "../../helpers/errorHandler";
import { STATUS_CODE } from "../../helpers/statusCode";
import validation from "./task.validation";
import { NextFunction, Request, Response } from "express";

const { addTasksValidation, getTasksValidation } = validation;

const { BAD_REQUEST } = STATUS_CODE;

export const validateAddTask = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = addTasksValidation.body.validate(req.body);
  if (error) {
    next(new ErrorHandler(error.message, BAD_REQUEST));
    return;
  }
  next();
};

export const validateGetTasks = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = getTasksValidation.params.validate(req.body);

  if (error) {
    next(new ErrorHandler(error.message, BAD_REQUEST));
    return;
  }
  next();
};

export const validateUpdateTask = () => {};
