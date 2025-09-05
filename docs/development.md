# Development Guide

This file expands on the quick start instructions from the project root `README.md`. It covers environment variables, package management and database commands in more depth.

## Environment setup

1. Copy `.env.example` to `.env` and adjust the values. The important variables are:
   - `DATABASE_URL` – connection string used by Prisma. SQLite is used by default.
   - `VITE_ENABLE_LOGGING` – set to `false` to silence `logger` output.
2. Install Node dependencies. Either `pnpm` or `npm` will work:
   ```bash
   pnpm install
   # or
   npm install
   ```
3. Push the Prisma schema and create the SQLite database:
   ```bash
   npm run db:push
   ```
4. Start the development server with hot reloading:
   ```bash
   npm run dev
   ```
   The app is served on [http://localhost:5173](http://localhost:5173).

### Database utilities

- `npm run db:studio` – open [Prisma Studio](https://www.prisma.io/studio) in the browser to inspect and modify local data.
- `npm run db:migrate` – create and run a migration when the schema changes.
- `npm run db:start` – start the optional Postgres container defined in `docker-compose.yml` if you prefer Postgres over SQLite.

### PDF viewer dependency

The PDF viewer component requires the [`mupdf`](https://www.npmjs.com/package/mupdf) package. A placeholder type declaration exists at `src/mupdf.d.ts` so compilation succeeds even when the package is missing. If you wish to try the real library run:

```bash
pnpm add mupdf
```

and remove the placeholder type file.
