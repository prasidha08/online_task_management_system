import express from "express";
import mongooseDatabase from "mongoose";
import { config } from "./config";

export const app = express();

// Database connection
// mongooseDatabase.connect("");

// const db = mongooseDatabase.connection;
// listening to port 8081

app.listen(config.PORT, () => {
  console.log("Server is started at port", config.PORT);
});
