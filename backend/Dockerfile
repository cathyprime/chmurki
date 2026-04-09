# --- Etap deps: instalacja zależności produkcyjnych ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --only=production

# --- Etap test: instalacja devDependencies i uruchomienie testów ---
FROM node:18-alpine AS test
WORKDIR /app
COPY package.json ./
RUN npm install
COPY index.js ./
COPY index.test.js ./
RUN npm test

# --- Etap production: obraz końcowy ---
FROM node:18-alpine AS production

ARG BUILD_DATE
ARG VERSION
ARG NODE_ENV=production

LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.title="product-dashboard-backend"

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY index.js ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider --quiet http://localhost:3000/health || exit 1

USER appuser

CMD ["node", "index.js"]
