# Etapa de construcción
FROM node:18 AS builder
WORKDIR /app

# Instalar dependencias
COPY package*.json ./

COPY .env.production ./


RUN npm install

# Copiar el código fuente y construir el proyecto
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para el frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
