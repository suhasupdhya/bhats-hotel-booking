#!/bin/bash

# Hotel Booking System Startup Script

echo "🚀 Starting Hotel Booking System..."

# Function to handle script exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap Ctrl+C (SIGINT) to run cleanup
trap cleanup SIGINT

# Start Backend Server
echo "📦 Starting Backend Server..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to initialize
sleep 2

# Start Frontend Server
echo "🎨 Starting Frontend Server..."
npm run dev

# Wait for background processes
wait
