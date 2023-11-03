"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// import dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config();
exports.config = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || 8080,
};
