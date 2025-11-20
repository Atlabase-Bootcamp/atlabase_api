import type { NextFunction, Request, Response } from "express";
import * as authService from "@/src/api/auth/auth.service.js";
import { httpStatus } from "@@/utils/api.error.js";
import { success } from "@/src/utils/response.helper.js";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.registerUser(req.body);
    return success(res, user, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await authService.loginUser(req.body);
    return success(res, token, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};
