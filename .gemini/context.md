# Gemini Context for Starter Kit

## Project Overview

This is a **polyglot monorepo** - a template repository for managing multiple independent projects in various languages/frameworks.

## Key Principles

1. **No Shared Code**: Each app in `/apps` is completely independent. Do NOT create shared components, utilities, or libraries across apps.

2. **Each App Lives Alone**: Every project in `/apps/*` should be self-contained with its own:
   - Package manager (npm, pip, cargo, go mod, etc.)
   - Dependencies
   - Build system
   - Configuration files

3. **Languages & Frameworks** are free to vary per app:
   - `/apps/web` - Frontend apps (React, Vue, Svelte, Next.js, Nuxt, etc.)
   - `/apps/mobile` - Mobile apps (React Native, Flutter, Swift, Kotlin, etc.)
   - `/apps/desktop` - Desktop apps (Electron, Tauri, Qt, etc.)
   - `/apps/backend` - Backend services (Express, FastAPI, Go, Rust, etc.)
   - `/apps/cli` - Command-line tools

4. **Docker**: Use `/docker` folder for docker-compose files that may orchestrate multiple apps.

## Working with Apps

- When asked to add a feature, find the appropriate `/apps/*` directory
- Each app can use any language or framework it needs
- Do NOT assume shared dependencies exist between apps
- Tests live within each app, not at the root level

## Important Notes

- This template is intentionally minimal
- Root files only for monorepo-level configuration
- Individual app configurations stay inside their own directory
