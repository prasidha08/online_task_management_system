"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const express = require("express");
const config_1 = require("./config");
const app = express();
// Database connection
// mongooseDatabase.connect("");
// const db = mongooseDatabase.connection;
// listening to port 8081
app.listen(config_1.config.PORT, () => {
    console.log("Server is started at port dd", config_1.config.PORT);
});
