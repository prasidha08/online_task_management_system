import { NextFunction, Request, Response } from "express";
import userValidation from "./user.validation";
import { STATUS_CODE } from "../../helpers/statusCode";
import jwt from "jsonwebtoken";
import ErrorHandler from "../../helpers/errorHandler";
import { config } from "../../config";

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

// verify token

export const verifyToken = (req: Request, _: Response, next: NextFunction) => {
  const authorization = req.headers.authorization; // Assuming the token is sent in the Authorization header

  const token = authorization?.split(" ")[1];

  if (!config.ACCESS_SECRET_TOKEN) {
    next(new ErrorHandler("Token is undefined", 401));
    return;
  }

  if (!token) {
    next(new ErrorHandler("No token provided", 401));
    return;
  }

  jwt.verify(token, config.ACCESS_SECRET_TOKEN, (err, decoded) => {
    console.log(
      "🚀 ~ file: user.middleware.ts:94 ~ jwt.verify ~ decoded:",
      decoded
    );
    if (err) {
      next(new ErrorHandler("Invalid token", 401));
    }
    next();
  });
};
