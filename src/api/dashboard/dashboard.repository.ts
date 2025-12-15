import prisma from "@/src/config/db.js";
import type { Prisma } from "@prisma/client";

class DashboardRepository {
  async getKpis(userId: string) {
    const [totalCustomers, activeProjects] = await Promise.all([
      prisma.customer.count({
        where: { user_id: userId },
      }),
      prisma.project.count({
        where: {
          user_id: userId,
          status: "IN_PROGRESS",
        },
      }),
    ]);
    return { totalCustomers, activeProjects };
  }

  async findProjectsByStatus(userId: string) {
    const projects = prisma.project.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: { user_id: userId },
    });
    return projects;
  }

  async findUpcomingDeadlines(userId: string) {
    const today = new Date();
    const nextTwoWeeks = new Date();
    nextTwoWeeks.setDate(today.getDate() + 14);
    const project = prisma.project.findMany({
      where: {
        user_id: userId,
        status: { notIn: ["COMPLETED", "CANCELLED"] },
        estimated_end_date: { gte: today, lte: nextTwoWeeks },
      },
      orderBy: {
        estimated_end_date: "asc",
      },
      take: 5,
      include: {
        customer: {
          select: { name: true },
        },
      },
    });
    return project;
  }
}

export const dashboardRepository = new DashboardRepository();
