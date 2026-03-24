# Promptplate Architecture

## Overview

Promptplate is an AI prompt management and sharing platform built as a polyglot monorepo.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | Laravel 11, PHP 8.2 |
| Database | MySQL 8.0 |
| Authentication | Laravel Sanctum |

## Project Structure

```
promptplate/
├── apps/
│   ├── web/        # Next.js frontend (port 3000)
│   └── backend/   # Laravel API (port 8000)
├── docker/        # Docker Compose configuration
├── docs/          # This documentation
└── scripts/       # Development utility scripts
```

## Architecture Diagram

```
┌─────────────────┐      ┌─────────────────┐
│   Next.js      │      │    MySQL        │
│   Frontend     │◄────►│    Database     │
│   (Port 3000)  │      │    (Port 3306)  │
└────────┬────────┘      └─────────────────┘
         │
         │ HTTP/REST
         ▼
┌─────────────────┐
│    Laravel      │
│    Backend      │
│  (Port 8000)    │
└─────────────────┘
```

## Frontend (`apps/web`)

- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS, Shadcn UI components
- **State**: React Hook Form + SWR for data fetching
- **API Client**: Axios

### Key Directories

```
apps/web/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities (axios, utils)
├── public/           # Static assets
└── styles/           # Global styles
```

### API Integration

The frontend communicates with the backend via REST API:
- Base URL: `NEXT_PUBLIC_BACKEND_URL` env (defaults to `http://localhost:8000`)
- Authentication: Bearer token from Laravel Sanctum

## Backend (`apps/backend`)

- **Framework**: Laravel 11
- **ORM**: Eloquent
- **Authentication**: Laravel Sanctum (SPA authentication)
- **API**: RESTful endpoints

### Key Directories

```
apps/backend/
├── app/
│   ├── Http/         # Controllers, Middleware
│   └── Models/       # Eloquent models
├── config/           # Laravel configuration
├── database/
│   ├── migrations/   # Database migrations
│   └── seeders/      # Database seeders
├── routes/           # API routes
└── tests/            # PHPUnit tests
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prompts` | List all prompts |
| POST | `/api/prompts` | Create a prompt |
| GET | `/api/prompts/{id}` | Get single prompt |
| PUT | `/api/prompts/{id}` | Update prompt |
| DELETE | `/api/prompts/{id}` | Delete prompt |
| GET | `/api/tags` | List all tags |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |

### Database Schema

**Users Table**
- id, name, email, password, timestamps

**Prompts Table**
- id, user_id, title, content, created_at, updated_at

**Tags Table**
- id, name, timestamps

**prompt_tag Table** (pivot)
- prompt_id, tag_id

## Docker

The project uses Docker Compose for local development:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

Services:
- `web` - Next.js frontend
- `backend` - Laravel API
- `db` - MySQL database

## Development Workflow

### Local Development

1. Install dependencies:
   ```bash
   ./scripts/install.sh
   ```

2. Run both apps:
   ```bash
   ./scripts/dev.sh
   ```

3. Access:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### With Docker

1. Start services:
   ```bash
   ./scripts/docker-up.sh
   ```

2. Run migrations (first time):
   ```bash
   docker-compose -f docker/docker-compose.yml exec backend php artisan migrate
   ```

## CI/CD

GitHub Actions workflow:
- Path-based filtering triggers relevant builds
- `apps/web/**` changes → Build & test frontend
- `apps/backend/**` changes → Run PHPUnit tests
