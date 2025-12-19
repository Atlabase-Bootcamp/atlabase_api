import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./api/middlewares/error.handler.js";
import auth_router from "./api/auth/auth.routes.js";
import customer_router from "./api/customers/customer.routes.js";
import project_router from "./api/projects/project.routes.js";
import dashboard_router from "./api/dashboard/dashboard.routes.js";

const app = express();
const base_route = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get(base_route, (req, res) => {
  res.send("¡API de Atlabase funcionando!");
});

app.use(base_route, auth_router);
app.use(base_route, dashboard_router);
app.use(base_route, customer_router);
app.use(base_route, project_router);

app.use(errorHandler);

export default app;
