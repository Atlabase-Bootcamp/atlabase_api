import { ZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      Object.assign(req, parsed);

      return next();
    } catch (error) {
      next(error);
    }
  };
