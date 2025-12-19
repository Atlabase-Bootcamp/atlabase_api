import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.request.js";
import {
  createProjectSchema,
  createTaskSchema,
  updateProjectSchema,
  updateTaskSchema,
  type UpdateTaskParams,
} from "../../schemas/project.schema.js";
import { projectController } from "./project.controller.js";
import type { IdParam } from "../../schemas/common.schema.js";
const project_router = Router();

project_router.get("/projects/", authenticate, (req, res, next) =>
  projectController.getAll(req, res, next)
);

project_router.get<IdParam>("/projects/:id", authenticate, (req, res, next) =>
  projectController.getProjectById(req, res, next)
);

project_router.post(
  "/projects/",
  authenticate,
  validate(createProjectSchema),
  (req, res, next) => projectController.create(req, res, next)
);

project_router.delete<IdParam>(
  "/projects/:id",
  authenticate,
  (req, res, next) => projectController.remove(req, res, next)
);

project_router.put<IdParam>(
  "/projects/:id",
  authenticate,
  validate(updateProjectSchema),
  (req, res, next) => projectController.update(req, res, next)
);

project_router.post<IdParam>(
  "/projects/:id/tasks",
  authenticate,
  validate(createTaskSchema),
  (req, res, next) => projectController.createTask(req, res, next)
);

project_router.put<UpdateTaskParams>(
  "/projects/:id/tasks/:taskId",
  authenticate,
  validate(updateTaskSchema),
  (req, res, next) => projectController.updateTask(req, res, next)
);

project_router.delete<UpdateTaskParams>(
  "/projects/:id/tasks/:taskId",
  authenticate,
  (req, res, next) => projectController.deleteTask(req, res, next)
);

export default project_router;
