FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
EXPOSE 80
CMD ["serve", "-s", "build"]
