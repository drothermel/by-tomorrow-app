# By Tomorrow - Research Paper Management App

**By Tomorrow** is a SvelteKit application for organising research papers and notes. It provides a workflow for searching [arXiv](https://arxiv.org), tagging papers, managing a personal library and experimenting with a custom document editor. The code base has been refactored extensively and these README files serve as a guide for future contributors.

## Quick start

1. Copy `.env.example` to `.env` and adjust the variables such as `DATABASE_URL` and `VITE_ENABLE_LOGGING`.
2. Install dependencies with `pnpm install` (or `npm install`).
3. Initialise the database:
   ```bash
   npm run db:push
   ```
4. Launch the dev server:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

More detailed setup instructions and component documentation live in the [`docs/`](docs/) directory.

## Features

- arXiv search and library management
- PDF viewer with editable URL input
- Experimental editor built with the in‑house **Svedit** framework

## License

This project is licensed under the Creative Commons Attribution‑NonCommercial 4.0 International License. See [LICENSE](LICENSE) for details.
