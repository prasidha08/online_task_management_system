import { NextFunction, Request, Response } from "express";
import userValidation from "./user.validation";
import { STATUS_CODE } from "../../helpers/statusCode";

const {
  userRegisterValidation,
  userUpdateValidation,
  userAddFriendValidation,
  userRemoveFriendValidation,
} = userValidation;

const { BAD_REQUEST } = STATUS_CODE;

export const registerOrSignInValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const response = userRegisterValidation.body.validate(req.body);
  if (response.error) {
    return next({ status: BAD_REQUEST, message: response.error.message });
  }
  return next();
};

export const updateValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const response = userUpdateValidation.body.validate(req.body);

  if (response.error) {
    return next({ status: BAD_REQUEST, message: response.error.message });
  }
  return next();
};

export const addFriendValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const response = userAddFriendValidation.body.validate(req.body);
  const paramsResponse = userAddFriendValidation.params.validate(req.params);

  if (response.error || paramsResponse.error) {
    return next({
      status: BAD_REQUEST,
      message: response.error?.message ?? paramsResponse.error?.message,
    });
  }
  return next();
};

export const removeFriendValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const response = userRemoveFriendValidation.body.validate(req.body);
  const paramsResponse = userRemoveFriendValidation.params.validate(req.params);

  if (response.error || paramsResponse.error) {
    return next({
      status: BAD_REQUEST,
      message: response.error?.message ?? paramsResponse.error?.message,
    });
  }
  return next();
};
