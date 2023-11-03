"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.default.Schema({
    title: String,
    userIds: [String],
});
exports.categoryModel = mongoose_1.default.model("category", categorySchema);
