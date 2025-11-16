import { Router } from "express";
import { registerHandler, loginHandler } from "@/src/api/auth/auth.controller.js";
import { validate } from "@@/api/middlewares/validate.request.js";
import { registerSchema, loginSchema } from "@/src/schemas/auth.schema.js";

// Creamos el router para autenticacion:
export const router = Router();

//register usa validate() que pasa por el middleware con registerSchema 
//(Valida los datos con la herramienta zod) y registerHandler.
router.post("/register", validate(registerSchema), registerHandler);

//login usa validate() que pasa por el middleware con loginSchema 
//(Valida los datos con la herramienta zod) y loginHandler.
router.post("/login", validate(loginSchema), loginHandler);


const auth_router = Router();

export default auth_router;
