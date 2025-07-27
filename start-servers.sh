#!/bin/bash

echo "🌱 Starting Green Givers Nursery Development Environment..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install server dependencies if needed
if [ ! -d "node_modules_server" ]; then
    echo "📦 Installing server dependencies..."
    npm install --prefix . express cors nodemon
    mkdir -p node_modules_server
    mv node_modules/* node_modules_server/ 2>/dev/null || true
fi

# Install React app dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing React app dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting API Server on http://localhost:3002..."
echo "🌐 Starting React App on http://localhost:3000..."
echo ""
echo "💡 Admin Panel: http://localhost:3000/admin-plant-management-2024"
echo "📱 Collections Page: http://localhost:3000/collections"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=================================================="

# Start both servers concurrently
node server.js &
SERVER_PID=$!

npm start &
REACT_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $SERVER_PID 2>/dev/null
    kill $REACT_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for both processes
wait
