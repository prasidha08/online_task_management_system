import express from "express";
import mongooseDatabase from "mongoose";
import { config } from "./config";
import cors from "cors";
import { USER_BASE_URL } from "./helpers/urls";
import userRouter from "./module/user/user.router";

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

app.use(express.json());

app.use(USER_BASE_URL, userRouter);

//TODO :HANDLE ERROR
