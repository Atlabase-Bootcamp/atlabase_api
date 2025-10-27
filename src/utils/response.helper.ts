import type { Response } from "express";

export function success(res: Response, data: any, status = 200) {
  res.status(status).json({ success: true, data });
}
