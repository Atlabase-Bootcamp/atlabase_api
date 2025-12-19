import { loginSchema, registerSchema } from "../../schemas/auth.schema.js";
import { Router } from "express";
import { validate } from "../middlewares/validate.request.js";
import { loginHandler, registerHandler } from "../auth/auth.controller.js";
const auth_router = Router();

auth_router.post("/auth/login", validate(loginSchema), loginHandler);
auth_router.post("/auth/register", validate(registerSchema), registerHandler);

export default auth_router;
