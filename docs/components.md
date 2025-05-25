# Component Reference

This page describes the most important Svelte components and routes. The application is split into modes – **search**, **library**, **reader** and **editor** – each implemented as a dedicated route under `src/routes`.

## Routes

- `/search` – query the arXiv API and save papers to the local library. The server side logic resides in [`src/routes/search/+page.server.ts`](../src/routes/search/+page.server.ts). Client side rendering is handled in [`src/routes/search/+page.svelte`](../src/routes/search/+page.svelte). The search results are displayed with `PaperCard` components and can be bulk tagged before saving to the library.
- `/library` – view saved paper metadata. The table UI is implemented in [`src/lib/components/library/libraryTable.svelte`](../src/lib/components/library/libraryTable.svelte) and the server actions in [`src/routes/library/+page.server.ts`](../src/routes/library/+page.server.ts).
- `/reader` – simple PDF viewer that lets you specify a URL. See [`src/routes/reader/+page.svelte`](../src/routes/reader/+page.svelte).
- `/editor` – experimental document editor based on the custom **Svedit** framework. The entry page is [`src/routes/editor/+page.svelte`](../src/routes/editor/+page.svelte).

## Svedit

The editor used in `/editor` is built from the files under [`src/lib/svedit`](../src/lib/svedit). A `SveditSession` manages the root `BlockData` and tracks undo/redo history. Blocks can be nested and support Markdown rendering. See [`src/lib/svedit/BlockData.svelte.ts`](../src/lib/svedit/BlockData.svelte.ts) for the block model and [`src/lib/svedit/Svedit.svelte`](../src/lib/svedit/Svedit.svelte) for the top level component.

## UI components

Reusable UI primitives live under [`src/lib/components/ui`](../src/lib/components/ui). They mirror the structure of component libraries like Radix UI and are re‑exported as needed. Higher level components, such as the sidebar and cards used throughout the app, can be found in `src/lib/components`.

## Database

Prisma models are defined in [`prisma/schema.prisma`](../prisma/schema.prisma). At the moment there is a single `PaperMetadataLibrary` table holding arXiv metadata and tags. The helper functions in [`src/lib/database.ts`](../src/lib/database.ts) perform upserts and transactional updates.
