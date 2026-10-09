#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  start.sh  –  CumbumValley AgriApp one-click interview startup
#
#  Usage:
#    chmod +x start.sh   (only needed once)
#    ./start.sh
#
#  What it does:
#    1. Checks that Docker is running
#    2. Creates .env from .env.example if it doesn't exist
#    3. Checks for port conflicts on 5000, 5173, 27017
#    4. Builds and starts all Docker services in order
#    5. Tails logs so you can see everything in one terminal
# ─────────────────────────────────────────────────────────────────────────────

set -e

# ── Colors ───────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

banner() {
  echo ""
  echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}${BOLD}   🌿 CumbumValley AgriApp – Interview Launcher    ${NC}"
  echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════${NC}"
  echo ""
}

step() { echo -e "${CYAN}${BOLD}▶ $1${NC}"; }
ok()   { echo -e "${GREEN}✔ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
fail() { echo -e "${RED}✘ $1${NC}"; exit 1; }

# ── 1. Banner ─────────────────────────────────────────────────────────────────
banner

# ── 2. Docker check ───────────────────────────────────────────────────────────
step "Checking Docker..."
if ! command -v docker &>/dev/null; then
  fail "Docker is not installed. Install from https://www.docker.com/products/docker-desktop"
fi
if ! docker info &>/dev/null; then
  fail "Docker daemon is not running. Start Docker Desktop first."
fi
ok "Docker is running ($(docker --version))"

# ── 3. Environment file ───────────────────────────────────────────────────────
step "Setting up environment..."
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    cp .env.example .env
    ok "Created .env from .env.example"
  else
    warn ".env.example not found – proceeding without .env (defaults will be used)"
  fi
else
  ok ".env already exists – not overwriting"
fi

# ── 4. Port conflict check ────────────────────────────────────────────────────
step "Checking for port conflicts..."
check_port() {
  local port=$1
  local name=$2
  if lsof -i TCP:"$port" -sTCP:LISTEN -t &>/dev/null 2>&1; then
    warn "Port $port ($name) is already in use. The Docker service will try to claim it."
    warn "If startup fails, run: lsof -ti TCP:$port | xargs kill -9"
  else
    ok "Port $port ($name) is free"
  fi
}
check_port 27017 "MongoDB"
check_port 5000  "Backend API"
check_port 5173  "Frontend Vite"

# ── 5. Build & Start ──────────────────────────────────────────────────────────
step "Building images and starting all services..."
echo ""
docker compose down --remove-orphans 2>/dev/null || true
docker compose up --build -d

# ── 6. Wait for backend health ────────────────────────────────────────────────
step "Waiting for backend to become ready..."
MAX_WAIT=90
ELAPSED=0
until curl -sf http://localhost:5000/ &>/dev/null; do
  if [ "$ELAPSED" -ge "$MAX_WAIT" ]; then
    fail "Backend did not become healthy within ${MAX_WAIT}s. Run: docker compose logs backend"
  fi
  echo -n "."
  sleep 3
  ELAPSED=$((ELAPSED + 3))
done
echo ""
ok "Backend is ready!"

# ── 7. Wait for frontend ──────────────────────────────────────────────────────
step "Waiting for frontend to become ready..."
ELAPSED=0
until curl -sf http://localhost:5173/ &>/dev/null; do
  if [ "$ELAPSED" -ge "$MAX_WAIT" ]; then
    warn "Frontend may still be starting. Check: docker compose logs frontend"
    break
  fi
  echo -n "."
  sleep 3
  ELAPSED=$((ELAPSED + 3))
done
echo ""

# ── 8. Done ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}   ✅ ALL SERVICES ARE RUNNING!                    ${NC}"
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${BOLD}Frontend (React):${NC}   ${CYAN}http://localhost:5173${NC}"
echo -e "  ${BOLD}Backend  (API):${NC}     ${CYAN}http://localhost:5000${NC}"
echo -e "  ${BOLD}Health check:${NC}       ${CYAN}http://localhost:5000/${NC}"
echo -e "  ${BOLD}MongoDB:${NC}            ${CYAN}mongodb://localhost:27017/agri-app${NC}"
echo ""
echo -e "  ${BOLD}Demo credentials seeded automatically:${NC}"
echo -e "  ${YELLOW}Farmer:${NC} greenvalley@example.com  / password123"
echo -e "  ${YELLOW}Farmer:${NC} cumbumspice@example.com  / password123"
echo -e "  ${YELLOW}Farmer:${NC} kumilypepper@example.com / password123"
echo ""
echo -e "  ${BOLD}To watch logs:${NC}  docker compose logs -f"
echo -e "  ${BOLD}To stop all:${NC}    docker compose down"
echo ""

# ── 9. Done ────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}All services are running in the background!${NC}"
echo -e "To view logs anytime, run: ${CYAN}docker compose logs -f${NC}"
