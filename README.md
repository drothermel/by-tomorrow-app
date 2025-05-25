# By Tomorrow - Research Paper Management App

By Tomorrow is a SvelteKit application for organizing research papers. It lets you search [arXiv](https://arxiv.org), tag papers, and maintain a library for easy reference. The project also includes a custom document editor and PDF viewer to help manage reading notes.

## Development setup

1. Install dependencies with your preferred package manager (npm or pnpm):
   ```bash
   pnpm install
   # or
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## Database

The app uses Prisma with a PostgreSQL database. Copy `.env.example` to `.env` and adjust `DATABASE_URL` if needed. To run a local database in Docker and apply schema migrations:

```bash
# start the Postgres container
npm run db:start

# apply Prisma migrations (interactive)
npm run db:migrate
```

You can open Prisma Studio to explore the data:
```bash
npm run db:studio
```

## Running tests

There are currently no automated tests for this project.

## Roadmap

- Search arXiv and save metadata with custom tags
- View your paper library and remove entries
- PDF viewer with editable URL input
- Rich-text editor built with Svedit
- Upcoming: login flow and file manager

