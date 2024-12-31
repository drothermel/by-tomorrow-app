import type { ArxivMetadata, ArxivQuery } from "$lib/schemas";

export type ActionData = {
    success: boolean,
    query: ArxivQuery,
    data: ArxivMetadata,
};