# Étape 1 : Build de l'application React
FROM node:18 as build

WORKDIR /app

# Copie des fichiers de configuration pour le cache
COPY package.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers et build
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine

# Copie des fichiers buildés
COPY --from=build /app/build /usr/share/nginx/html

# Configuration Nginx pour gérer le routage côté client
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
