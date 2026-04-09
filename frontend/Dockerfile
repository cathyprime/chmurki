# --- Build stage ---
FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build

# --- Nginx stage ---
FROM nginx:1.25-alpine
RUN mkdir -p /var/cache/nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
