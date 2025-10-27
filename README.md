# Atlabase API 🚀

<p align="center">
  <img src="./assets/cover.png" alt="Logo de Atlabase" width="1100">
</p>

Este es el repositorio del backend para **Atlabase**, un SaaS (Software as a Service) de tipo Micro-CRM diseñado para simplificar la vida de los freelancers. Provee una API RESTful para gestionar clientes, proyectos y tareas de forma centralizada.

> **Status:** 🚧 **En Desarrollo** 🚧
>
> Este proyecto es parte del Bootcamp de Devlights y está siendo construido activamente.

---

## ✨ Características Principales

* **Autenticación Segura:** Registro e inicio de sesión usando JWT (Tokens) y hashing de contraseñas con `bcrypt`.
* **Gestión de Datos:** Funcionalidad CRUD completa para Clientes, Proyectos y Tareas.
* **Seguridad de Datos:** Los datos de cada freelancer están aislados y protegidos (un usuario solo puede ver sus propios datos).
* **Validación Robusta:** Validación de esquemas en todas las rutas de la API usando `Zod`.
* **Manejo de Errores Centralizado:** Un `errorHandler` personalizado que envía respuestas de error limpias y consistentes.

---

## 🛠️ Stack Tecnológico

| Área | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/en) | Entorno de ejecución de JavaScript |
| **Framework** | [Express](https://expressjs.com/) | Framework para el servidor y API REST |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | Superset de JavaScript con tipos |
| **Base de Datos** | [PostgreSQL](https://www.postgresql.org/) | Base de datos relacional |
| **ORM** | [Prisma](https://www.prisma.io/) | ORM de nueva generación para Node.js y TS |
| **Autenticación**| [JWT](https://jwt.io/) / [Bcrypt](https://www.npmjs.com/package/bcrypt) | Tokens de sesión y hashing de contraseñas |
| **Validación** | [Zod](https://zod.dev/) | Validación de esquemas |
| **Dev Server** | [tsx](https://www.npmjs.com/package/tsx) | Ejecutor de TypeScript rápido |
| **Logging** | [Morgan](https://www.npmjs.com/package/morgan) | Logger de peticiones HTTP para desarrollo |
| **Variables** | [dotenv](https://www.npmjs.com/package/dotenv) | Carga de variables de entorno |

---

## 🚀 Cómo Empezar

Sigue estos pasos para levantar el servidor de desarrollo en tu máquina local.

### 1. Prerrequisitos

* [Node.js](https://nodejs.org/en) (v20+ recomendado)
* [npm](https://www.npmjs.com/)
* Una instancia de [PostgreSQL](https://www.postgresql.org/download/) corriendo localmente.

### 2. Clonar el Repositorio

```bash
git clone [https://github.com/GerardoVollmer/atlabase_api.git](https://github.com/GerardoVollmer/atlabase_api.git)
cd atlabase_api
```
### 3. Instalar Dependencias

```bash
npm install
```
### 4. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto. Puedes copiar el .env.example (si existe) o usar esta plantilla:

#### Configuración de la Base de Datos (ajusta con tu usuario y contraseña de Postgres)
```bash
DATABASE_URL="postgresql://postgres:gariglios33@localhost:5432/atlabase_db"
```

#### Configuración del Servidor
```bash
NODE_ENV=development
PORT=3001
```

#### Secreto para JSON Web Tokens (JWT) - ¡Cámbialo por una frase larga y secreta!
```bash
JWT_SECRET="TU_FRASE_SECRETA_SUPER_LARGA_AQUI"
```

### 5. Sincronizar la Base de Datos
Este comando leerá tu schema.prisma, creará la base de datos atlabase_db (si no existe) y generará las tablas.

```bash
npm run prisma:migrate
```

#### Después de migrar, genera el cliente de Prisma:

```bash
npm run prisma:generate
```

### 6. Iniciar el Servidor de Desarrollo

```bash
npm run dev
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
| **npm run prisma:migrate** | Ejecuta las migraciones de la base de datos.
| **npm run prisma:generate**	| Genera el cliente de Prisma basado en el schema.prisma.

---

## 🏗️ Arquitectura del Proyecto

```bash
src/
├── api/
│   ├── auth/
│   ├── users/
│   ├── customers/
│   ├── projects/
│   ├── tasks/
│   ├── admin/
│   └── middlewares/  (Compartidos)
├── config/
├── schemas/
├── types/
├── utils/
├── app.ts            (Config. de Express)
└── server.ts         (Punto de entrada)
```

## 📚 Endpoints del API
(Próximamente...)

La documentación de los endpoints se añadirá a medida que se construyan. Para probar la API, recomendamos usar Postman o Insomnia.

---

📄 Licencia

Este proyecto está bajo la Licencia MIT.
