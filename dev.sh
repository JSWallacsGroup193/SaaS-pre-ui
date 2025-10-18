#!/bin/bash

# Start backend in background
cd backend && npm run start:dev &
BACKEND_PID=$!

# Start frontend in foreground
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
