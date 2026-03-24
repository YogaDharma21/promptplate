#!/bin/bash

set -e

echo "Installing Promptplate dependencies..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd "$(dirname "$0")/../apps/backend"
if [ -f composer.json ]; then
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate
else
    echo "Warning: composer.json not found in apps/backend"
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd "$(dirname "$0")/../apps/web"
if [ -f package.json ]; then
    npm install
else
    echo "Warning: package.json not found in apps/web"
fi

echo ""
echo "Installation complete!"
echo ""
echo "To run the development servers:"
echo "  ./scripts/dev.sh"
echo ""
echo "Or manually:"
echo "  cd apps/backend && php artisan serve"
echo "  cd apps/web && npm run dev"
