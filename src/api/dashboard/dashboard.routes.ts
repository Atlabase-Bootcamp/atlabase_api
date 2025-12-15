import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { dashboardController } from "./dashboard.controller.js";

const dashboard_router = Router();

dashboard_router.get("/dashboard", authenticate, (req, res, next) =>
  dashboardController.getDashboard(req, res, next)
);

export default dashboard_router;
