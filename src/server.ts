import dotenv from "dotenv";
dotenv.config();
import prisma from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  try {
    prisma.$connect();
    console.log("Conexión a la Base de Datos Establecida!");
    console.log(
      `🚀 Servidor de Atlabase corriendo en http://localhost:${PORT}`
    );
  } catch (error) {
    console.log("Error al contectar con la BD", error);
  } finally {
    prisma.$disconnect();
  }
});
