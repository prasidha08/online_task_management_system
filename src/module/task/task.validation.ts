import Joi from "joi";
import { LABEL, STATUS } from "./task.interface";

const UserListsSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
});

const validateAddTaskSchema = Joi.object({
  label: Joi.string().valid(...Object.values(LABEL)),
  title: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .required(),
  createdAt: Joi.number(),
  createdBy: Joi.string().required(),
  categoryId: Joi.string().required(),
  description: Joi.string().allow(null),
  userLists: Joi.alternatives().try(Joi.object().allow(null), UserListsSchema), // these are the person who can see the tasks
  estimatedHr: Joi.number().allow(null),
  updatedAt: Joi.number().allow(null).default(null),
  updatedBy: Joi.string().allow(null).default(null),
  taskCompletedHr: Joi.number().allow(null).default(null),
});

const validateCategoryIdParams = Joi.object({
  categoryId: Joi.string().required(),
});

export = {
  addTasksValidation: {
    body: validateAddTaskSchema,
  },

  getTasksValidation: {
    params: validateCategoryIdParams,
  },
};
