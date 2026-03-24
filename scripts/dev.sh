#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "Starting Promptplate development servers..."
echo ""
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Check if required tools are available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

if ! command -v composer &> /dev/null; then
    echo "Error: composer is not installed"
    exit 1
fi

# Start backend
cd "$PROJECT_DIR/apps/backend"
if [ -f .env ]; then
    php artisan serve --port=8000 &
else
    echo "Warning: .env not found in apps/backend. Run ./scripts/install.sh first"
    exit 1
fi

# Start frontend
cd "$PROJECT_DIR/apps/web"
if [ -f package.json ]; then
    npm run dev &
else
    echo "Warning: package.json not found in apps/web. Run ./scripts/install.sh first"
    exit 1
fi

# Wait for any process to exit
wait
