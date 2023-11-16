import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../index";
import { ObjectId } from "mongodb";
import { TCreateUser, TUserUpdate } from "./user.interface";
import ErrorHandler from "../../helpers/errorHandler";
import { STATUS_CODE } from "../../helpers/statusCode";
import jwt from "jsonwebtoken";
import { config } from "../../config";

const { CONFLICT, CREATED, SUCCESS, UNAUTHORIZED, INTERNAL_SERVER, FORBIDDEN } =
  STATUS_CODE;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userDoc = req.body;
  try {
    const existedUser = await db().collection("user").findOne({ email });

    if (existedUser !== null) {
      throw new ErrorHandler("User already exists.", CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userDoc.password = hashedPassword;
    userDoc.createdAt = Date.now();
    userDoc.name = null;
    userDoc.address = null;
    userDoc.updatedAt = null;
    userDoc.phoneNumber = null;

    const result = await db().collection("user").insertOne(userDoc);

    delete userDoc.password;

    res.status(CREATED).json({
      success: true,
      data: {
        ...userDoc,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: TCreateUser = req.body;

  try {
    if (
      config.SECRET_TOKEN === undefined ||
      config.ACCESS_SECRET_TOKEN === undefined
    ) {
      throw new ErrorHandler(
        "Access token secret is not defined",
        INTERNAL_SERVER
      );
    }

    const result = await db()
      .collection("user")
      .findOne({ email }, { projection: { password: 1, _id: 0 } });

    if (result === null) {
      throw new ErrorHandler("User does not exists.");
    }

    const hashedPassword = bcrypt.compareSync(password, result.password);

    if (!hashedPassword) {
      throw new ErrorHandler("Invalid password", UNAUTHORIZED);
    }

    const refreshToken = jwt.sign(
      { email, password: hashedPassword },
      config.SECRET_TOKEN
    );

    const accessToken = jwt.sign(
      { email, password: hashedPassword },
      config.ACCESS_SECRET_TOKEN,
      { expiresIn: "2m" }
    );

    res.status(SUCCESS).json({
      success: true,
      data: { refreshToken, accessToken },
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const userDataToUpdate: TUserUpdate = req.body;
  userDataToUpdate.updatedAt = Date.now();
  try {
    if (userDataToUpdate.password !== undefined) {
      const hashedPassword = await bcrypt.hash(userDataToUpdate.password, 10);
      userDataToUpdate.password = hashedPassword;
    }

    const result = await db()
      .collection("user")
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: userDataToUpdate }
      );

    res.status(SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const addFriend = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const userDataToUpdate: {
    friendLists: [{ name: string; _id: string }];
    updatedAt: number;
  } = req.body;

  userDataToUpdate.updatedAt = Date.now();
  try {
    const result = await db()
      .collection("user")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $push: { friendLists: userDataToUpdate.friendLists } }
      );

    res.status(SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const removeFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    const result = await db()
      .collection("user")
      .updateOne(
        { _id: new ObjectId(userId) },
        {
          $pull: { friendLists: { _id: friendId } },
          $set: { updatedAt: Date.now() },
        }
      );

    res.status(SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.refreshToken;

  if (
    config.SECRET_TOKEN === undefined ||
    config.ACCESS_SECRET_TOKEN === undefined
  ) {
    next(new ErrorHandler("Token is prod", INTERNAL_SERVER));
    return;
  }

  if (!refreshToken) {
    next(new ErrorHandler("Refresh token is required", UNAUTHORIZED));
    return;
  }

  jwt.verify(
    refreshToken,
    config.SECRET_TOKEN,
    (err: jwt.VerifyErrors | null, decoded?: string | jwt.JwtPayload) => {
      if (err) {
        next(new ErrorHandler("Failed to verify refresh token", FORBIDDEN));
      }

      // If the refresh token is valid, issue a new access token
      console.log(decoded);
      const accessToken = jwt.sign({}, config.ACCESS_SECRET_TOKEN!, {
        expiresIn: "1m",
      }); // New access token

      res.status(200).json({ accessToken });
    }
  );
};

export = {
  createUser,
  updateUser,
  addFriend,
  removeFriend,
  signInUser,
  refreshToken,
};
