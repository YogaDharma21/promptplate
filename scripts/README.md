# Scripts

This folder contains utility scripts for the Promptplate monorepo.

## Available Scripts

### install.sh

Installs all dependencies for both frontend and backend applications.

```bash
./scripts/install.sh
```

This will:
- Run `composer install` for the backend
- Copy `.env.example` to `.env` and generate app key
- Run database migrations
- Run `npm install` for the frontend

### dev.sh

Runs both frontend and backend development servers concurrently.

```bash
./scripts/dev.sh
```

This will start:
- Backend API at http://localhost:8000
- Frontend at http://localhost:3000

### docker-up.sh

Starts all services using Docker Compose.

```bash
./scripts/docker-up.sh
```

This will start:
- Frontend (Next.js) at http://localhost:3000
- Backend (Laravel) at http://localhost:8000
- MySQL database at localhost:3306

## Requirements

- **install.sh**: Node.js, npm, PHP, Composer
- **dev.sh**: Node.js, npm, PHP, Composer
- **docker-up.sh**: Docker, Docker Compose
