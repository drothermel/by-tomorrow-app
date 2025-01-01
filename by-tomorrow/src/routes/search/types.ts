import type { ArxivMetadataList, ArxivQuery } from "$lib/schemas";

export type ActionData = {
    success: boolean,
    query: ArxivQuery,
    data: ArxivMetadataList,
};