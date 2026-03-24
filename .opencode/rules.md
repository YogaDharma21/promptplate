# Opencode Rules for Promptplate

## Project Overview

This is **Promptplate** - an AI prompt management and sharing platform built as a polyglot monorepo.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Laravel 11, PHP 8.2
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum

## Project Structure

```
apps/
├── web/        # Next.js frontend (port 3000)
└── backend/   # Laravel API (port 8000)
```

## Key Principles

1. **No Shared Code**: Each app in `/apps` is completely independent. Do NOT create shared components, utilities, or libraries across apps.

2. **Each App Lives Alone**: Every project in `/apps/*` is self-contained:
   - `apps/web` uses npm, Next.js, React
   - `apps/backend` uses Composer, Laravel, PHP

3. **API Communication**: Frontend communicates with backend via REST API at `/api/*`:
   - Base URL: `http://localhost:8000/api` (dev) or from env `NEXT_PUBLIC_API_URL`
   - Authentication via Laravel Sanctum tokens

## Working with Apps

- Frontend changes → work in `/apps/web`
- Backend changes → work in `/apps/backend`
- Both can run concurrently for local development

## Database

- Laravel Eloquent ORM with MySQL
- Migrations in `apps/backend/database/migrations`
- Models in `apps/backend/app/Models`

## Important Notes

- This is Promptplate, a real application - not a template
- Follow Laravel/Next.js best practices for respective apps
- Tests live within each app (PHPUnit for backend, built-in for Next.js)
