# Atlabase API 🚀

<p align="center">
  <img src="https://res.cloudinary.com/dx7e5izqu/image/upload/v1761590790/Cover_-_Lexend_Deca_itslfl.png" alt="Logo de Atlabase" width="1100">
</p>

Este es el repositorio del backend para **Atlabase**, un SaaS (Software as a Service) de tipo Micro-CRM diseñado para simplificar la vida de los freelancers. Provee una API RESTful para gestionar clientes, proyectos y tareas de forma centralizada.

> **Status:** 🚧 **En Desarrollo** 🚧
>
> Este proyecto es parte del Bootcamp de Devlights y está siendo construido activamente.

---

## ✨ Características Principales

* **Autenticación Segura:** Registro e inicio de sesión usando JWT (Tokens) y hashing de contraseñas con `bcrypt`.
* **Arquitectura Modular:** Estructura basada en *features* para facilitar la escalabilidad.
* **Base de Datos NoSQL:** Uso de MongoDB Atlas para un esquema flexible y escalable.
* **Entorno Dockerizado:** Configuración lista para usar con Docker Compose, garantizando consistencia entre desarrolladores.
* **Validación Robusta:** Validación de esquemas en todas las rutas de la API usando `Zod`.

---

## 🛠️ Stack Tecnológico

| Área | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/en) | Entorno de ejecución (v24 LTS) |
| **Framework** | [Express](https://expressjs.com/) | Framework para el servidor y API REST |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | Superset de JavaScript con tipos |
| **Base de Datos** | [MongoDB Atlas](https://www.mongodb.com/atlas) | Base de datos NoSQL en la nube |
| **ORM** | [Prisma](https://www.prisma.io/) | ORM para interactuar con MongoDB |
| **Infraestructura** | [Docker](https://www.docker.com/) | Contenerización del entorno de desarrollo |
| **Autenticación**| [JWT](https://jwt.io/) / [Bcrypt](https://www.npmjs.com/package/bcrypt) | Tokens de sesión y hashing |
| **Validación** | [Zod](https://zod.dev/) | Validación de datos de entrada |

---

## 🚀 Cómo Empezar (Entorno Docker)

Este proyecto está configurado para correr 100% dentro de Docker. No necesitas instalar Node.js ni MongoDB en tu máquina local.

### 1. Prerrequisitos

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Instalado y corriendo).
* [Git](https://git-scm.com/).
* (Opcional) [MongoDB Compass](https://www.mongodb.com/products/tools/compass) para visualizar la base de datos.

### 2. Clonar el Repositorio

```bash
git clone [https://github.com/GerardoVollmer/atlabase_api.git](https://github.com/GerardoVollmer/atlabase_api.git)
cd atlabase_api
```

### 3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto copiando el siguiente ejemplo. Nota: Necesitarás la cadena de conexión de MongoDB Atlas proporcionada por el líder del proyecto.

```bash
# Conexión a MongoDB Atlas
DATABASE_URL="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/atlabase_db?retryWrites=true&w=majority"

# Configuración del Servidor
NODE_ENV=development
PORT=3001

# Secreto para JWT
JWT_SECRET="TU_FRASE_SECRETA_SUPER_LARGA_AQUI"
```
### 4. Iniciar el Proyecto
Ejecuta el siguiente comando para construir la imagen y levantar el contenedor:

```bash
docker compose up --build
```
- La API estará disponible en: http://localhost:3001/api/v1

- El servidor se reiniciará automáticamente al detectar cambios en el código (Hot Reload).

Para detener el servidor:

```bash
docker compose down
```

¡Listo! La API estará corriendo en http://localhost:3001. El servidor se reiniciará automáticamente cada vez que hagas un cambio en el código fuente.

---

## 📜 Scripts Disponibles
Estos son los scripts principales definidos en el package.json:
| Script | Acción |
| :--- | :--- |
| **npm run dev**	| Inicia el servidor en modo desarrollo con tsx watch.
| **npm run build**	| Compila el código TypeScript a JavaScript en la carpeta /dist.
| **npm run start**	| Ejecuta el código JavaScript compilado (para producción).
| **npm run prisma:generate**	| Genera el cliente de Prisma basado en el schema.prisma.

---

## 🏗️ Arquitectura del Proyecto

Seguimos una Arquitectura Monolítica Modular. El código se organiza por "Features" (Dominios) en lugar de capas técnicas genéricas.

```bash
src/
├── api/                  # Lógica de Negocio
│   ├── auth/             # Feature: Autenticación
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   └── auth.service.ts
│   ├── users/            # Feature: Usuarios
│   │   └── users.repository.ts
│   ├── customers/        # Feature: Clientes (Próximamente)
│   └── middlewares/      # Middlewares compartidos (Auth, ErrorHandler)
├── config/               # Configuración (DB, Envs)
├── schemas/              # Esquemas de validación Zod (auth.schema.ts)
├── utils/                # Helpers (JWT, Hashing, ApiError)
├── app.ts                # Configuración de Express
└── server.ts             # Punto de entrada
```

## 📚 Endpoints del API
### 1. Autenticación
- #### Registro
```bash
POST /api/v1/auth/register
```
_Descripción: Registra un nuevo usuario en la plataforma._

**Body:**
```bash
{
  "email": "usuario@ejemplo.com",
  "password": "passwordSegura123",
  "username": "usuario1",
  "first_name": "Juan",
  "last_name": "Perez"
}
```
- #### Inicio de sesión

```bash
POST /api/v1/auth/login
```
_Descripción: Inicia sesión y devuelve un token de acceso._

**Body:**
```bash
{
  "email": "usuario@ejemplo.com",
  "password": "passwordSegura123"
}
```

La documentación de los endpoints se añadirá a medida que se construyan. Para probar la API, recomendamos usar Postman o Insomnia.

---

📄 Licencia

Este proyecto está bajo la Licencia MIT.
