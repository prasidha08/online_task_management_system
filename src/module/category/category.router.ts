import express from "express";
import { controllers } from "./category.controller";
import { CATEGORY_PARAMS_URL } from "../../helpers/urls";
import {
  validateAddCategory,
  validateDeleteCategory,
} from "./category.middleware";

const categoryRouter = express.Router();

categoryRouter.route("/").post(controllers.createCategory);

categoryRouter.route(CATEGORY_PARAMS_URL).delete(controllers.deleteCategory);

categoryRouter.route(CATEGORY_PARAMS_URL).patch(controllers.updateCategory);

export = categoryRouter;
