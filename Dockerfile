# ---- 1. La Base ----
FROM node:24-alpine [cite: 1]

# ---- 2. Configuración ----
WORKDIR /app

# ---- 3. Dependencias ----
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma ./prisma/

RUN npm install

# ---- 4. Código Fuente ----
COPY . .

# ---- 5. Construcción (Build) ----
RUN npx prisma generate 
RUN npm run build

# ---- 7. Ejecución ----
EXPOSE 3001

CMD ["npm", "run", "start"]

