# By Tomorrow - Research Paper Management App

By Tomorrow is a SvelteKit application for organizing research papers. It lets you search [arXiv](https://arxiv.org), tag papers, and maintain a library for easy reference. The project also includes a custom document editor and PDF viewer to help manage reading notes.

## Development setup

1. Copy `.env.example` to `.env` and adjust the values as needed. The file
   defines environment variables such as `DATABASE_URL` for Prisma and
   `VITE_ENABLE_LOGGING` to control console output.
2. Install dependencies with your preferred package manager (npm or pnpm):
   ```bash
   pnpm install
   # or
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

### PDF viewer dependency

The `pdfViewer` component expects a module named `mupdf`. A simple type
declaration is included at `src/mupdf.d.ts` so the code compiles even when the
package is missing. To use the real library, install it with your package
manager:

```bash
pnpm add mupdf
```

After installing the module you can delete `src/mupdf.d.ts` since the explicit
type declaration is no longer required.

## Database

The app uses Prisma with a SQLite database. Copy `.env.example` to `.env` and edit
the variables as needed. `DATABASE_URL` configures the database connection and
`VITE_ENABLE_LOGGING` can be set to `false` to silence console logs. After
configuring your environment, initialize the database with:
```
npm run db:push
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

