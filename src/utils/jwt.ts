import jwt, { type SignOptions } from "jsonwebtoken";
import { ApiError, httpStatus } from "./api.error.js";

const secret = process.env.JWT_SECRET;

if (!secret || secret === undefined) {
  throw new Error("La variable de entorno JWT_SECRET no está definida");
}

export function signJwt(
  payload: Record<string, any>,
  expiresIn: string | number = "1d"
) {
  return jwt.sign(payload, secret!, { expiresIn: expiresIn as any });
}

export function verifyJwt(token: string) {
  try {
    const payload = jwt.verify(token, secret!);
    return payload;
  } catch (error) {
    throw new ApiError("Token inválido o expirado", httpStatus.UNAUTHORIZED);
  }
}
