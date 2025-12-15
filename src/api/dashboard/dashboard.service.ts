import { dashboardRepository } from "./dashboard.repository.js";

class DashboardService {
  private dashboardRepository = dashboardRepository;

  async getDashboardData(userId: string) {
    const [kpis, projectsRaw, upcomingDeadLines] = await Promise.all([
      this.dashboardRepository.getKpis(userId),
      this.dashboardRepository.findProjectsByStatus(userId),
      this.dashboardRepository.findUpcomingDeadlines(userId),
    ]);

    const projectsByStatus = projectsRaw.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    return {
      kpis,
      charts: {
        projects_by_status: projectsByStatus,
      },
      upcoming_deadlines: upcomingDeadLines,
    };
  }
}

export const dashboardService = new DashboardService();
