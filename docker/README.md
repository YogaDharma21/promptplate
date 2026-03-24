# Docker Configuration

This folder contains Docker configurations for the monorepo.

## Usage

### Starting all services

```bash
docker-compose -f docker/docker-compose.yml up
```

### Starting specific service

```bash
docker-compose -f docker/docker-compose.yml up <service-name>
```

### Stopping services

```bash
docker-compose -f docker/docker-compose.yml down
```

## Adding a new service

1. Add your service to `docker-compose.yml`
2. Each app in `/apps/*` should have its own `Dockerfile`
3. Reference the app directory in the service configuration

Example:

```yaml
services:
  web:
    build: 
      context: ../apps/web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
```

## Notes

- This is a placeholder for future docker configurations
- Each app is responsible for its own Dockerfile
- The root docker-compose.yml orchestrates all apps
