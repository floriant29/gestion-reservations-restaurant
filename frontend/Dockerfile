# Étape 1 : Build de l'application React
FROM node:18 as build
WORKDIR /app
COPY package.json ./
RUN npm install --include=dev
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine
# Installe curl pour le healthcheck
RUN apk add --no-cache curl
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
