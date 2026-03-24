#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "Starting Promptplate with Docker..."
echo ""
echo "Backend API: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "MySQL: localhost:3306"
echo ""

docker-compose -f docker/docker-compose.yml up -d

echo ""
echo "Services started!"
echo ""
echo "To view logs:"
echo "  docker-compose -f docker/docker-compose.yml logs -f"
echo ""
echo "To stop:"
echo "  docker-compose -f docker/docker-compose.yml down"
