import prisma from "../../../src/config/db.js";
import type { Prisma } from "@prisma/client";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "../../../src/schemas/project.schema.js";

class ProjectRepository {
  async findAllByUserId(userId: string) {
    return prisma.project.findMany({
      where: { user_id: userId },
      include: { customer: true },
      orderBy: { created_at: "desc" },
    });
  }

  async findById(projectId: string, userId: string) {
    return prisma.project.findUnique({
      where: { id: projectId, user_id: userId },
      include: { customer: true },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({ data });
  }

  async update(
    projectId: string,
    userId: string,
    data: Prisma.ProjectUpdateInput
  ) {
    return prisma.project.update({
      where: { id: projectId, user_id: userId },
      data,
    });
  }

  async remove(projectId: string, userId: string) {
    return prisma.project.delete({
      where: { id: projectId, user_id: userId },
    });
  }

  // --- Tasks ---

  async addTask(projectId: string, userId: string, task: CreateTaskInput) {
    const newTask: Prisma.TaskCreateInput = {
      ...task,
      id: crypto.randomUUID(),
      is_completed: false,
      created_at: new Date(),
    };

    return prisma.project.update({
      where: { id: projectId, user_id: userId },
      data: {
        tasks: { push: newTask },
      },
    });
  }

  async updateTask(
    projectId: string,
    userId: string,
    taskId: string,
    data: UpdateTaskInput
  ) {
    const project = await prisma.project.findUnique({
      where: { id: projectId, user_id: userId },
    });

    if (!project) return null;

    const taskExists = project.tasks.find((t) => t.id === taskId);
    if (!taskExists) return null;

    const updatedTasks: Prisma.TaskCreateInput[] = project.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          id: task.id,
          title: data.title ?? task.title,
          description:
            data.description !== undefined
              ? data.description
              : task.description,
          is_completed: data.is_completed ?? task.is_completed,
          created_at: task.created_at,
        };
      }
      return task;
    });

    return prisma.project.update({
      where: { id: projectId },
      data: {
        tasks: {
          set: updatedTasks,
        },
      },
    });
  }

  async removeTask(taskId: string, projectId: string, userId: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId, user_id: userId },
    });

    if (!project) return null;

    const initialLength = project.tasks.length;
    const filteredTasks = project.tasks.filter((t) => t.id !== taskId);

    if (filteredTasks.length === initialLength) return null;

    return prisma.project.update({
      where: { id: projectId },
      data: {
        tasks: {
          set: filteredTasks,
        },
      },
    });
  }
}

export const projectRepository = new ProjectRepository();
