#!/usr/bin/env bash
set -e

export PATH="$HOME/.bun/bin:$PATH"

echo "Stopping existing processes..."
pkill -f "src/index.ts" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

sleep 1

echo "Starting server and client..."
exec ./run.sh
