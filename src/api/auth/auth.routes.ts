import { loginSchema, registerSchema } from "../../schemas/auth.schema.js";
import { Router } from "express";
import { validate } from "../middlewares/validate.request.js";
import { authController } from "./auth.controller.js";

const auth_router = Router();

auth_router.post("/auth/login", validate(loginSchema), (req, res, next) =>
  authController.loginHandler(req, res, next)
);

auth_router.post("/auth/register", validate(registerSchema), (req, res, next) =>
  authController.registerHandler(req, res, next)
);

export default auth_router;
