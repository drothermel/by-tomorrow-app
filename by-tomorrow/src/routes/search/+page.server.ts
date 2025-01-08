import type { ArxivQuery, ArxivMetadataList, SortByType } from "$lib/schemas"
import { queryArxiv } from "$lib/arxiv/arxiv.svelte";
import type { ActionData } from "./types";
import { db } from '$lib/database';

export const load = async () => {
  // Fetch all arxivId values from the database
  const papers = await db.paperMetadata.findMany({
    select: {
      arxivId: true,
    },
  });

  // Extract arxivId values into an array
  const arxivIds = papers.map((paper) => paper.arxivId);

  // Return the arxivIds to be available in the page's data
  return {
    arxivIds,
  };
};

export const actions = {
    query: async ({ request }): Promise<ActionData> => {
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