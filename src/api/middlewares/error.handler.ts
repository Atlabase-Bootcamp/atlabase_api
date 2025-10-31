import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@@/utils/api.error.js";
import z, { ZodError } from "zod";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        status: error.statusCode,
        ...error.additionalData,
      },
    });
  } else if (error instanceof ZodError) {
    console.log(z.prettifyError(error));
    return res.status(400).json({
      errror: {
        message: "Validation Failed",
        errors: z.flattenError(error),
      },
    });
  } else {
    console.log(error as Error);
    res.status(500).json({
      error: {
        message: "Internal Server Error",
      },
    });
  }
}
