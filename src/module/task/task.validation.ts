import Joi, { alternatives, number, string } from "joi";
import { LABEL, STATUS } from "./task.interface";

const UserListsSchema = Joi.object({
  _id: string().required(),
  name: string().required(),
});

const validateAddTaskSchema = Joi.object({
  label: string().valid(...Object.values(LABEL)),
  title: string().required(),
  status: string().valid(...Object.values(STATUS)),
  createdAt: number().required(),
  createdBy: string().required(),
  categoryId: string(),
  description: string().allow(null),
  userLists: alternatives().try(Joi.object().allow(null), UserListsSchema), // these are the person who can see the tasks
  estimatedHr: number().allow(null),
  updatedAt: number().allow(null),
  updatedBy: string().allow(null),
  taskCompletedHr: number().allow(null),
});

const validateCategoryIdParams = Joi.object({
  categoryId: string().required(),
});

export = {
  addTasksValidation: {
    body: validateAddTaskSchema,
  },

  getTasksValidation: {
    params: validateCategoryIdParams,
  },
};
