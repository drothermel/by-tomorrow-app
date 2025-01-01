import type { ArxivQuery, ArxivMetadataList, SortByType } from "$lib/schemas"
import { z } from 'zod';
import { queryArxiv } from "$lib/components/arxiv.svelte";
import type { ActionData } from "./types";
import { arxivMetadataSchema } from '$lib/schemas';
import type { PaperMetadataInput } from '$lib/database';
import { upsertPapersInTransaction } from '$lib/database';
import { db } from '$lib/database';

export const load = async () => {
  // Fetch all arxivId values from the database
  const papers = await db.paperMetadataLibrary.findMany({
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
    addToLibrary: async ({ request }) => {
        try {
            // Parse and validate form data
            const formData = await request.formData();
            const rawData = formData.get('data');
            if (!rawData) {
              return { success: false, error: 'No data provided.' };
            }
      
            // Parse raw JSON data into an array
            const jsonData = JSON.parse(rawData as string) as unknown[];
            const validatedData = z.array(arxivMetadataSchema).parse(jsonData);
            console.log("After validate data")
      
            // Map validated data to match Prisma's PaperMetadataInput
            const metadataList: PaperMetadataInput[] = validatedData.map((entry) => ({
              arxivId: entry.id,
              published: new Date(entry.published),
              updated: new Date(entry.updated),
              title: entry.title,
              abstract: entry.summary,
              authors: Array.isArray(entry.author)
                ? entry.author.join(', ')
                : entry.author,
              absLink: entry.links?.absLink || '',
              pdfLink: entry.links?.pdfLink || '',
              categories: Array.isArray(entry.category)
                ? entry.category.join(', ')
                : entry.category,
              primaryCategory: entry.primaryCategory,
              comments: entry.comment,
            }));
      
            // Insert metadata into the database
            // await db.paperMetadataLibrary.createMany({
            //   data: metadataList,
            // });
            await upsertPapersInTransaction(metadataList);
      
            console.log("error inside the action??")

            return { success: true };
          } catch (error) {
            console.error('Error adding to library:', error);
            return { success: false, error: 'Failed to add metadata to library.' };
          }


    },
};