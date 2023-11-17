import express, { NextFunction, Request, Response } from "express";
import mongooseDatabase from "mongoose";
import { config } from "./config";
import cors from "cors";
import {
  CATEGORY_BASE_URL,
  TASK_BASE_URL,
  USER_BASE_URL,
} from "./helpers/urls";
import userRouter from "./module/user/user.router";
import { STATUS_CODE } from "./helpers/statusCode";
import categoryRouter from "./module/category/category.router";
import { verifyToken } from "./module/user/user.middleware";
import taskRouter from "./module/task/task.router";

const app = express();

// Database connection
export let dbConnection: mongooseDatabase.Connection;

mongooseDatabase
  .connect(config.MONGODB_URI ?? "")
  .then((client) => {
    dbConnection = client.connection;

    app.listen(config.PORT, () => {
      console.log("Server is started at port", config.PORT);
    });
  })
  .catch((err) => {
    console.log(err, "Something went wrong while connecting to the database.");
  });

export const db = () => dbConnection;

app.use(cors());

// Parses incoming JSON request data

app.use(express.json());

app.use(USER_BASE_URL, userRouter);

app.use(verifyToken);

app.use(CATEGORY_BASE_URL, categoryRouter);

app.use(TASK_BASE_URL, taskRouter);

// handle the incorrect route
app.use("*", (__: Request, _: Response, next: NextFunction) => {
  next({ status: STATUS_CODE.NOT_FOUND, message: "API not found." });
});

//  Handling error

app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  const { status, message } = err;
  res
    .status(status ?? STATUS_CODE.INTERNAL_SERVER)
    .json({ success: false, message });
});
