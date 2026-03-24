# Architecture Documentation

## Project Structure

```
starter-kit/
├── apps/           # Individual projects (web, mobile, desktop, backend, cli)
├── docker/         # Docker configurations
├── docs/           # Documentation
├── scripts/        # Utility scripts
└── .github/        # GitHub workflows
```

## Polyglot Monorepo Principles

### No Shared Code
Each app in `/apps` is completely independent:
- No shared components
- No shared utilities
- No shared libraries
- Each app has its own dependencies

### Each App Lives Alone
Every project in `/apps/*` is self-contained:
- Own package manager (npm, pip, cargo, go mod, etc.)
- Own dependencies
- Own build system
- Own configuration files

### Language Freedom
Apps can use any language/framework:
- `/apps/web` - React, Vue, Svelte, Next.js, Nuxt, etc.
- `/apps/mobile` - React Native, Flutter, Swift, Kotlin, etc.
- `/apps/desktop` - Electron, Tauri, Qt, etc.
- `/apps/backend` - Express, FastAPI, Go, Rust, etc.
- `/apps/cli` - Any CLI framework

## Adding a New App

1. Create a new folder under `/apps/<category>/`
2. Initialize the project with its own package manager
3. Add the appropriate CI job in `.github/workflows/`
4. Update `docker/docker-compose.yml` if needed

## CI/CD

The monorepo uses path-based filtering to run only relevant jobs:
- Changes to `apps/web/**` trigger the web build
- Changes to `apps/backend/**` trigger the backend build
- etc.

## Docker

Use `/docker/docker-compose.yml` to orchestrate multiple apps locally.
Each app should have its own `Dockerfile` if containerization is needed.
