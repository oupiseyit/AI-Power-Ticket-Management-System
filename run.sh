#!/usr/bin/env bash
set -e

export PATH="$HOME/.bun/bin:$PATH"

trap 'kill 0' EXIT

bun run dev:server &
bun run dev:client &

wait
