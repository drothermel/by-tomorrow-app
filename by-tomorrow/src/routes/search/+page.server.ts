import type { ArxivQuery, ArxivMetadataList, SortByType } from "$lib/schemas"
import { queryArxiv } from "$lib/components/arxiv.svelte";
import type { ActionData } from "./types";

export const actions = {
    default: async ({ request }): Promise<ActionData> => {
        const formData = await request.formData();
        let query: ArxivQuery = {
            start: 0,
            maxResults: Number(formData.get('maxResults')) ?? 10,
            sortBy: (String(formData.get('sortBy')) ?? 'lastUpdatedDate') as SortByType,
            sortOrder: 'descending',
            author: String(formData.get('queryAuthor')) ?? "Kyunghyun Cho",
            title: String(formData.get('queryTitle')) ?? "",
            ids: String(formData.get('queryId')) ?? "",
            joinType: "AND",
        }
        let data: ArxivMetadataList = await queryArxiv(query);

        return { success: true, query, data }
    },
};