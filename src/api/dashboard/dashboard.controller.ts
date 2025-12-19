import type { Request, Response, NextFunction } from "express";
import { dashboardService } from "./dashboard.service.js";
import { success } from "../../utils/response.helper.js";

class DashboardController {
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const data = await dashboardService.getDashboardData(userId);
      success(res, data);
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
