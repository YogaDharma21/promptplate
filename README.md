# Promptplate

A polyglot monorepo for an AI prompt management and sharing platform.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Laravel 11, PHP 8.2
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum

## Project Structure

```
promptplate/
├── apps/
│   ├── web/        # Next.js frontend application
│   └── backend/    # Laravel REST API
├── docker/         # Docker configurations
├── docs/           # Architecture documentation
├── scripts/        # Development utility scripts
└── .github/        # CI/CD workflows
```

## Getting Started

### Prerequisites

- Node.js 20+
- PHP 8.2+
- Composer
- Docker & Docker Compose
- MySQL 8.0 (or use Docker)

### Local Development

#### Option 1: Using Scripts

```bash
# Install all dependencies
./scripts/install.sh

# Run both apps concurrently
./scripts/dev.sh
```

#### Option 2: Manual Setup

**Backend:**
```bash
cd apps/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

**Frontend:**
```bash
cd apps/web
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend API will be at `http://localhost:8000`

### Using Docker

```bash
# Start all services
docker-compose -f docker/docker-compose.yml up -d

# View logs
docker-compose -f docker/docker-compose.yml logs -f

# Stop services
docker-compose -f docker/docker-compose.yml down
```

## API Endpoints

The backend provides REST API at `/api`:

- `GET /api/prompts` - List all prompts
- `POST /api/prompts` - Create a prompt
- `GET /api/prompts/{id}` - Get single prompt
- `PUT /api/prompts/{id}` - Update prompt
- `DELETE /api/prompts/{id}` - Delete prompt
- `GET /api/tags` - List all tags
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## CI/CD

This repository uses GitHub Actions with path-based filtering:
- Changes to `apps/web/**` trigger frontend builds
- Changes to `apps/backend/**` trigger backend tests

## License

[MIT](LICENSE)
