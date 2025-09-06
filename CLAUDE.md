# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

By Tomorrow is a SvelteKit application for organizing research papers and notes, built with TypeScript, Prisma, and TailwindCSS. The app provides workflow for searching arXiv, tagging papers, managing a personal library, and includes an experimental document editor called "Svedit".

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot reloading at http://localhost:5173
- `npm run build` - Build the application for production
- `npm run preview` - Preview production build locally
- `npm test` - Run test suite using Node.js built-in test runner

### Type Checking and Linting
- `npm run check` - Run svelte-check for TypeScript and Svelte validation
- `npm run check:watch` - Run svelte-check in watch mode

### Database Management (Prisma)
- `npm run db:push` - Push Prisma schema to database (use for development)
- `npm run db:migrate` - Create and run migrations (use for production schema changes)
- `npm run db:studio` - Open Prisma Studio to inspect/modify database data
- `npm run db:start` - Start optional Postgres container via docker-compose

### Package Management
Use either `pnpm` or `npm`. The project includes `pnpm` as a dependency and uses package-lock.json.

## Architecture

### Database Layer (Prisma)
- PostgreSQL/SQLite database with Prisma ORM
- Schema generates TypeScript types via Prisma client
- Zod schemas auto-generated from Prisma models in `src/lib/prisma/zod/`
- Core entities: PaperMetadata, PaperData, Question, Claim, Topic, Document, Snippet, Author
- Complex linking system between entities via integer arrays

### Frontend (SvelteKit)
- SvelteKit with TypeScript and Svelte 5
- File-based routing in `src/routes/`
- Component library: Melt UI (@melt-ui/svelte) + bits-ui + custom UI components
- Styling: TailwindCSS with tailwind-variants for component styling
- Main routes: `/` (home), `/search` (arXiv search), `/library` (paper management), `/reader` (PDF viewer), `/files` (file management)

### Key Libraries & Frameworks
- **SvelteKit**: Full-stack framework with server-side rendering
- **Prisma**: Database ORM with auto-generated client and Zod schemas
- **Melt UI**: Headless UI components for Svelte
- **TailwindCSS**: Utility-first CSS framework
- **Cheerio**: Server-side HTML parsing for arXiv data
- **marked**: Markdown parsing
- **mupdf**: PDF processing (optional dependency with placeholder types)

### Component Structure
- UI components in `src/lib/components/ui/` (tabs, sidebar, etc.)
- Application-specific components in `src/lib/components/`
- Shared utilities in `src/lib/utils.ts`
- Logging utility in `src/lib/logger.ts`
- Schema definitions in `src/lib/schemas.ts`

### Special Considerations
- PDF viewer requires optional `mupdf` package - placeholder types exist in `src/mupdf.d.ts`
- Generated Prisma Zod schemas excluded from TypeScript compilation
- Environment variables for database URL and logging configuration
- Docker Compose setup available for PostgreSQL development

## Environment Setup

1. Copy `.env.example` to `.env` and configure:
   - `DATABASE_URL` - Prisma database connection (defaults to SQLite)
   - `VITE_ENABLE_LOGGING` - Enable/disable logger output
2. Install dependencies: `pnpm install` or `npm install`
3. Initialize database: `npm run db:push`
4. Start development: `npm run dev`

## Testing

The project uses Node.js built-in test runner. Run tests with `npm test`. Test files should be in the `tests/` directory.