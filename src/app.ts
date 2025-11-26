import express from "express";
import cors from "cors";
import morgan from "morgan";
import auth_router from "@@/api/auth/auth.routes.js";
import { errorHandler } from "@/src/api/middlewares/error.handler.js";
import customer_router from "./api/customers/customer.routes.js";

const app = express();
const base_route = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/customers', customer_router);

app.get(base_route, (req, res) => {
  res.send("¡API de Atlabase funcionando!");
});

app.use(base_route, auth_router);

app.use(errorHandler);

export default app;
