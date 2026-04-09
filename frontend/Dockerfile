# --- Etap deps: instalacja zależności ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# --- Etap build: budowanie aplikacji React ---
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY public ./public
COPY src ./src
RUN npm run build

# --- Etap production: obraz Nginx z gotowym buildem ---
FROM nginx:1.25-alpine AS production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider --quiet http://localhost:80/ || exit 1

USER appuser

CMD ["nginx", "-g", "daemon off;"]
