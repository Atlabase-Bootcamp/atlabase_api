import { type JwtPayload } from "jsonwebtoken";

interface MyJwtPayload {
  id: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: MyJwtPayload;
    }
  }
}
