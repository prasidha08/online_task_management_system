import express from "express";
import { controllers } from "./category.controller";
import { CATEGORY_PARAMS_URL } from "../../helpers/urls";
import {
  validateAddCategory,
  validateDeleteCategory,
} from "./category.middleware";

const categoryRouter = express.Router();

categoryRouter
  .route("/:userId")
  .post(validateAddCategory, controllers.createCategory);
categoryRouter.route("/:userId").get(controllers.getAllCategory);

categoryRouter
  .route(CATEGORY_PARAMS_URL)
  .delete(validateDeleteCategory, controllers.deleteCategory);

categoryRouter.route(CATEGORY_PARAMS_URL).patch(controllers.updateCategory);

export = categoryRouter;
