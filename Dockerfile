# ---- 1. La Base ----
# Empezamos con la verisión ligera de Node.js basada en Alpine Linux (24 LTS)
FROM node:24-alpine

# ---- 2. Configuración del entorno de trabajo ----
# Establecemos el directorio de trabajo dentro del contenedor 
WORKDIR /app

# ---- 3. Optimización de dependencias (capa de caché) ----
# Copiamos el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Se copia la carpeta prisma y la config antes de instalar.
# Así el script 'postinstall' encontrará el schema y funcionará
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Pasamos la variable de entorno DATABASE_URL como argumento de construcción
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# ---- 4. Instalación de dependencias ----
# Instalamos las dependencias del proyecto
RUN npm install

## ---- 5. Copia del código fuente ----
# Copiamos todo el código fuente al contenedor
COPY . .


## ---- 6. Generación de Prisma Client ----
# Generamos el cliente de Prisma
RUN npx prisma generate

# --- 7. Exposición del puerto y comando de inicio ----
# Exponemos el puerto 3001 y definimos el comando para iniciar la aplicación en modo desarrollo
EXPOSE 3001
CMD ["npm", "run", "dev"]