#!/bin/bash

# Get the script directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Start backend in background on port 3000
cd "$DIR/backend" && PORT=3000 npm run start:dev &
BACKEND_PID=$!

# Start frontend on port 5000
cd "$DIR/frontend" && npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
