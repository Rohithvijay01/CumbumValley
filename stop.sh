#!/usr/bin/env bash
# stop.sh – Tears down all CumbumValley AgriApp Docker services cleanly
# Usage: ./stop.sh

echo "🛑 Stopping CumbumValley AgriApp..."
docker compose down --remove-orphans
echo "✔ All services stopped."
