import convert from "xml-js";
import { validateSchema } from '$lib/utils';
import type { ArxivQuery, ArxivMetadataList} from "$lib/schemas";
import { arxivResponseSchema } from "$lib/schemas";
import logger from '$lib/logger'

export const QUERY_BASE: string = 'https://export.arxiv.org/api/query?';

export async function queryArxiv(query: ArxivQuery): Promise<ArxivMetadataList> {
        let queryStr: string = buildQuery(query);
        const response = await fetch(queryStr);
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
        }

        // Arxiv API returns xml, convert to json
        const textResponse = await response.text();
        const jsonString: string = convert.xml2json(
            textResponse,
            { compact: true, spaces: 2},
        );
        const jsonData = JSON.parse(jsonString);

        // Validate the JSON response
        try {
            return validateSchema({
                dto: jsonData,
                schema: arxivResponseSchema,
                schemaName: "arxivResponseSchema",
            });
        } catch (error) {
            // Handle validation or parsing errors
            logger.error('Error parsing and validating response:', error);
        }
        return [] as ArxivMetadataList;
}

export function buildQuery(params: ArxivQuery): string {
    let query = QUERY_BASE;
    if (params.ids) {
        query += 'id_list=' + params.ids + '&';
    } else {
        query += 'search_query=';
        let queryParams = []
        if (params.title) queryParams.push('ti:"' + params.title + '"');
        if (params.author) queryParams.push('au:"' + params.author + '"');
        if (params.abstract) queryParams.push('abs:' + params.abstract);
        if (params.comment) queryParams.push('co:' + params.comment);
        if (params.journal) queryParams.push('jr:' + params.journal);
        if (params.category) queryParams.push('cat:' + params.category);
        if (params.reportNumber) queryParams.push('rn:' + params.reportNumber);
        if (params.all) queryParams.push('all:' + params.all);
        query += queryParams.join('+' + params.joinType + "+") + '&';
    }
    if (params.start) query += 'start=' + params.start + '&';
    if (params.maxResults) query += 'max_results=' + params.maxResults + '&';
    if (params.sortBy) query += 'sortBy=' + params.sortBy + '&';
    if (params.sortOrder) query += 'sortOrder=' + params.sortOrder + '&';
    query = query.slice(0, -1); // remove trailing '&'
    return query;
}

export function  authorsToString(authors: string[], query: ArxivQuery): string {
    let authorStrings = authors.map((a) => {
        return a == query.author ? `<span class="font-bold">${a}</span>` : a
    });
    return authorStrings.join(", ");
}

export function slugify(text: string) {
    return text
        .replace(/\s/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();
}
