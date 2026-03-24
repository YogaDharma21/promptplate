# Starter Kit

A **polyglot monorepo** template for managing multiple independent projects in various languages and frameworks.

## Philosophy

- **No shared code** - Each app is completely independent
- **Each app lives alone** - Self-contained with own dependencies, build system, and configuration
- **Language agnostic** - Use any framework or language per app

## Project Structure

```
apps/           # All projects (web, mobile, desktop, backend, cli)
├── web/        # Frontend applications
├── mobile/     # Mobile applications
├── desktop/    # Desktop applications
├── backend/    # Backend services
└── cli/        # Command-line tools

docker/         # Docker configurations
docs/           # Architecture documentation
scripts/        # Utility scripts
.github/        # CI/CD workflows
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for JS/TS projects)
- [Docker](https://www.docker.com/) (for containerization)
- [Python](https://www.python.org/) (for Python projects)
- [Go](https://go.dev/) (for Go projects)
- [Rust](https://www.rust-lang.org/) (for Rust projects)

### Creating a New App

1. Navigate to the appropriate folder under `apps/`
2. Initialize your project:

```bash
# Example: Creating a new web app
cd apps/web
npm create vite@latest my-app -- --template react
```

3. Update the CI workflow in `.github/workflows/ci.yml` if needed

### Running with Docker

```bash
# Start all services
docker-compose -f docker/docker-compose.yml up

# Start specific service
docker-compose -f docker/docker-compose.yml up web
```

## CI/CD

This repository uses GitHub Actions with path-based filtering:
- Changes to `apps/web/**` trigger web app builds
- Changes to `apps/backend/**` trigger backend builds
- Each app category has its own job

## License

[MIT](LICENSE)
