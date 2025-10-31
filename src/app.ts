import express from "express";
import cors from "cors";
import morgan from "morgan";
import admin_router from "@@/api/admin/admin.routes.js";
import { errorHandler } from "@/src/api/middlewares/error.handler.js";

const app = express();
const base_route = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("¡API de Atlabase funcionando!");
});

app.use(base_route, admin_router);

app.use(errorHandler);

export default app;
