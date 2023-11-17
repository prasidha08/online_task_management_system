import express from "express";
import { TASKS_PARAMS_URL, TASK_BASE_URL } from "../../helpers/urls";
import { addTasks, getTasks } from "./task.controller";
import { validateAddTask, validateGetTasks } from "./task.middleware";

const taskRouter = express.Router();

taskRouter.route(TASK_BASE_URL).post(validateAddTask, addTasks);

taskRouter.route(TASKS_PARAMS_URL).get(validateGetTasks, getTasks);

export = taskRouter;
