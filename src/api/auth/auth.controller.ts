import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service.js";
import { httpStatus } from "../../utils/api.error.js";
import { success } from "../../utils/response.helper.js";

class AuthController {
  private serviceAuth = authService;

  registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.serviceAuth.registerUser(req.body);
      return success(res, user, httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  };

  loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.serviceAuth.loginUser(req.body);
      return success(res, token, httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
