import type { Request, Response, NextFunction } from "express";
import { ApiError, httpStatus } from "../../utils/api.error.js";
import { verifyJwt } from "../../utils/jwt.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        "Acceso no autorizado. Se requiere token",
        httpStatus.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError("Formato de token inválido", httpStatus.UNAUTHORIZED);
    }

    const payload = verifyJwt(token);

    if (
      typeof payload === "object" &&
      payload !== null &&
      "user_id" in payload &&
      typeof payload.user_id === "string"
    ) {
      req.user = { id: payload.user_id as string };
      next();
    } else {
      throw new ApiError(
        "Payload de token inválido o malformado",
        httpStatus.UNAUTHORIZED
      );
    }
  } catch (error) {
    next(error);
  }
}
