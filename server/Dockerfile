# syntax=docker/dockerfile:1
# ─────────────────────────────────────────────────────────────
#  Backend Dockerfile  (Node 22 Alpine)
#  Placed at:  server/Dockerfile
# ─────────────────────────────────────────────────────────────

FROM node:22-alpine

# Install wget for health checks
RUN apk add --no-cache wget

WORKDIR /app

# Install dependencies first (layer-cached)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

EXPOSE 5000

# Default: production start. Docker Compose overrides this for dev.
CMD ["node", "server.js"]
