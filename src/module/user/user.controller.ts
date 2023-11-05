import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../index";
import { ObjectId } from "mongodb";
import { TCreateUser, TUserUpdate } from "./user.interface";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userDoc = req.body;
  try {
    const existedUser = await db().collection("user").findOne({ email });

    if (existedUser !== null) {
      throw new Error("User already existed.");
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

    res.status(200).json({
      success: true,
      data: { ...userDoc, _id: result.insertedId },
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false });
  }
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: TCreateUser = req.body;

  try {
    const result = await db()
      .collection("user")
      .findOne({ email }, { projection: { password: 1, _id: 0 } });

    if (result === null) {
      throw new Error("User does not exists.");
    }

    const hashedPassword = bcrypt.compareSync(password, result.password);

    if (!hashedPassword) {
      throw new Error("Invalid password");
    }

    //TODO: get token using JWT
    res.status(200).json({
      success: true,
      // data: result,
    });
  } catch (error) {
    res.send({ status: false });
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

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.send({ status: false });
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

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.send({ status: false });
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

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.send({ status: false });
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {}
};

export = {
  createUser,
  updateUser,
  addFriend,
  removeFriend,
  signInUser,
};
