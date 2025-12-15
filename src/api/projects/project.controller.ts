import type { Request, Response, NextFunction } from "express";
import { projectService } from "./project.service.js";
import { success } from "@/src/utils/response.helper.js";
import { ApiError, httpStatus } from "@/src/utils/api.error.js";
import type {
  UpdateTaskInput,
  UpdateTaskParams,
} from "@/src/schemas/project.schema.js";
import type { IdParam } from "@/src/schemas/common.schema.js";

class ProjectController {
  private projectService = projectService;

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;

      const projects = await this.projectService.getProjects(userId);
      success(res, projects);
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(
    req: Request<IdParam>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const project = await this.projectService.getProjectById(id, userId);
      success(res, project);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;

      const project = await this.projectService.createProject(userId, req.body);
      success(res, project, httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request<IdParam>, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      await this.projectService.removeProject(id, userId);
      success(res, httpStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request<IdParam>, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const updatedProject = await this.projectService.updateProject(
        id,
        userId,
        req.body
      );
      success(res, updatedProject);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request<IdParam>, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const task = await this.projectService.addTask(id, userId, req.body);
      success(res, task, httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(
    req: Request<UpdateTaskParams, {}, UpdateTaskInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, taskId } = req.params;
      const userId = req.user!.id;

      const updatedTask = await this.projectService.updateTask(
        id,
        userId,
        taskId,
        req.body
      );
      success(res, updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(
    req: Request<UpdateTaskParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, taskId } = req.params;
      const userId = req.user!.id;

      await this.projectService.removeTask(taskId, id, userId);

      success(res, null, httpStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export const projectController = new ProjectController();
