import { loginSchema, registerSchema } from "@/src/schemas/auth.schema.js";
import { Router } from "express";
import { validate } from "../middlewares/validate.request.js";
import { loginHandler, registerHandler } from "../auth/auth.controller.js";
const admin_router = Router();

admin_router.post("/auth/login", validate(loginSchema), loginHandler);
admin_router.post("/auth/register", validate(registerSchema), registerHandler);

export default admin_router;
