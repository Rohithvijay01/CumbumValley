# syntax=docker/dockerfile:1
# ─────────────────────────────────────────────────────────────
#  Frontend Dockerfile  (Node 22 Alpine – Vite dev server)
#  Placed at:  client/Dockerfile
# ─────────────────────────────────────────────────────────────

FROM node:22-alpine

WORKDIR /app

# Install dependencies first (layer-cached)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

EXPOSE 5173

# Vite dev server – listen on all interfaces so Docker can forward the port
CMD ["node", "node_modules/vite/bin/vite.js", "--host", "0.0.0.0", "--port", "5173"]
