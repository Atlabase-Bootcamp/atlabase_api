import { projectRepository } from "./project.repository.js";
import { customerRepository } from "../customers/customer.repository.js";
import { ApiError, httpStatus } from "../../utils/api.error.js";
import type {
  CreateProjectInput,
  UpdateProjectInput,
  CreateTaskInput,
  UpdateTaskInput,
} from "../../schemas/project.schema.js";

class ProjectService {
  private projectRepo = projectRepository;
  private customerRepo = customerRepository;

  async getProjects(userId: string) {
    return this.projectRepo.findAllByUserId(userId);
  }

  async getProjectById(id: string, userId: string) {
    const project = await this.projectRepo.findById(id, userId);
    if (!project)
      throw new ApiError("Proyecto no encontrado", httpStatus.NOT_FOUND);
    return project;
  }

  async createProject(userId: string, data: CreateProjectInput) {
    const customer = await this.customerRepo.findById(data.customerId, userId);

    if (!customer)
      throw new ApiError("Cliente no encontrado", httpStatus.NOT_FOUND);

    if (customer.user_id !== userId)
      throw new ApiError(
        "No tienes permiso sobre este cliente",
        httpStatus.FORBIDDEN
      );

    const prismaData = {
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      estimated_end_date: data.estimated_end_date,
      status: data.status,
      user: { connect: { id: userId } },
      customer: { connect: { id: data.customerId } },
      tasks: [],
    };

    return this.projectRepo.create(prismaData);
  }

  async updateProject(id: string, userId: string, data: UpdateProjectInput) {
    await this.getProjectById(id, userId);
    const dataForPrimsa = Object.fromEntries(
      Object.entries(data || {}).filter(([_, value]) => value !== undefined)
    );

    return this.projectRepo.update(id, userId, dataForPrimsa);
  }

  async removeProject(id: string, userId: string) {
    const project = await this.projectRepo.findById(id, userId);
    if (!project)
      throw new ApiError("Proyecto no encontrado", httpStatus.NOT_FOUND);
    const deleted = await this.projectRepo.remove(id, userId);
    if (!deleted)
      throw new ApiError(
        "Error al tratar de eliminar el proyecto.",
        httpStatus.BAD_REQUEST
      );
    return;
  }

  async addTask(projectId: string, userId: string, task: CreateTaskInput) {
    await this.getProjectById(projectId, userId);
    return this.projectRepo.addTask(projectId, userId, task);
  }

  async updateTask(
    projectId: string,
    userId: string,
    taskId: string,
    data: UpdateTaskInput
  ) {
    await this.getProjectById(projectId, userId);
    return this.projectRepo.updateTask(projectId, userId, taskId, data);
  }

  async removeTask(taskId: string, projectId: string, userId: string) {
    await this.getProjectById(projectId, userId);

    const updatedProject = await this.projectRepo.removeTask(
      taskId,
      projectId,
      userId
    );

    if (!updatedProject)
      throw new ApiError(
        "La tarea no existe o no se pudo borrar",
        httpStatus.CONFLICT
      );

    return updatedProject;
  }
}

export const projectService = new ProjectService();
