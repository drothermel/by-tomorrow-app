import { z } from 'zod';
import convert from "xml-js";
import type { ArxivQuery, ArxivMetadata} from "$lib/schemas";
import { arxivResponseSchema, arxivEntrySchema } from "$lib/schemas";

export default class ArxivHandler {

    // Default query params, maxResults higher than api default
    queryBase: string = 'https://export.arxiv.org/api/query?';
    currQuery: ArxivQuery = $state({
        start: 0,
        maxResults: 2,
        sortBy: 'lastUpdatedDate',
        sortOrder: 'descending',
        author: 'Kyunghyun Cho',
        title: "",
        ids: "",
        joinType: "AND",
    });
    history: ArxivQuery[] = $state([]);
    resultFeed: ArxivMetadata = $state([]);

    setQueryParams(params: ArxivQuery) {
        this.currQuery = params;
    }

    async queryArxiv() {
        let queryStr = this.buildQuery(this.currQuery);
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
            this.resultFeed = arxivResponseSchema.parse(jsonData);
        } catch (error) {
            // Handle validation or parsing errors
            console.error('Error parsing and validating response:', error);
            this.resultFeed = [];
        }
        console.log($state.snapshot(this.resultFeed));
    }

    buildQuery(params: ArxivQuery) {
        let query = this.queryBase;
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
        console.log(query)
        return query;
    }

    parseResponseString(response: string) {
    }

    authorsToString(authors: string[], query: ArxivQuery): string {
        let authorStrings = authors.map((a) => {
            return a == query.author ? `<span class="font-bold">${a}</span>` : a
        });
        return authorStrings.join(", ");
    }

    slugify(text: string) {
        return text
          .replace(/\s/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "")
          .toLowerCase();
    }


}