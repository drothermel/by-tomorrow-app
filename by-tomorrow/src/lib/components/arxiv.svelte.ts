import convert from "xml-js";

export default class ArxivHandler {

    // Default query params, maxResults higher than api default
    queryBase: string = 'https://export.arxiv.org/api/query?';
    currQuery = $state({
        start: 0,
        maxResults: 2,
        sortBy: 'lastUpdatedDate',
        sortOrder: 'descending',
        author: "Kyunghyun Cho",
    });
    history = $state([]);
    resultFeed: object[] = $state([]);

    setQueryParams(params) {
        this.currQuery = params;
    }

    async queryArxiv() {
        let queryStr = this.buildQuery(this.currQuery);
        const response = await fetch(queryStr);
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
        }
        const textResponse = await response.text();
        this.convertResponseToJson(textResponse);
    }

    buildQuery(params) {
        let query = this.queryBase;
        if (params.ids) {
            query += 'id_list=' + params.ids.join(',') + '&';
        } else {
            query += 'search_query=';
            if (params.title) query += 'ti:' + params.title + '&';
            if (params.author) query += 'au:"' + params.author + '"&';
            if (params.abstract) query += 'abs:' + params.abstract + '&';
            if (params.comment) query += 'co:' + params.comment + '&';
            if (params.journal) query += 'jr:' + params.journal + '&';
            if (params.category) query += 'cat:' + params.category + '&';
            if (params.reportNumber) query += 'rn:' + params.reportNumber + '&';
            if (params.all) query += 'all:' + params.all + '&';
        }
        if (params.start) query += 'start=' + params.start + '&';
        if (params.maxResults) query += 'max_results=' + params.maxResults + '&';
        if (params.sortBy) query += 'sortBy=' + params.sortBy + '&';
        if (params.sortOrder) query += 'sortOrder=' + params.sortOrder + '&';
        if (params.submittedDate) query += 'submittedDate=' + params.submittedDate + '&';
        query = query.slice(0, -1); // remove trailing '&'
        return query;
    }

    convertResponseToJson(response) {
        const jsonString = convert.xml2json(
            response, 
            {
                compact: true,
                spaces: 2,
            }
        );
        const result = JSON.parse(jsonString);
        const entries = result['feed']['entry'];
        this.resultFeed = entries.map((e) => {return this.parseArxivFeedEntry(e)});
        console.log($state.snapshot(this.resultFeed));
    }

    parseArxivFeedEntry(entry) {
        let metadata =  {
            id: entry.id._text ?? crypto.randomUUID(),
            updated: entry.updated._text,
            published: entry.published._text,
            title: entry.title._text.replace(/\r?\n/g, " "),
            summary: entry.summary._text.replace(/\r?\n/g, " "),
            authors: Array.isArray(entry.author) ? entry.author.map(
                (a) => { return a.name._text; }
            ) : [entry.author.name._text],
            primaryCategory: entry["arxiv:primary_category"]._attributes.term,
            categories: Array.isArray(entry.category) ? entry.category.map(
                (c) => { return c._attributes.term; }) : [entry.category._attributes.term],
        };

        let namedLinks = entry.link.filter(
            (l) => {("title" in l)}
        );
        let unnamedLinks= entry.link.filter(
            (l) => {!("title" in l)}
        );
        if (namedLinks.length > 0 && "_attributes" in namedLinks[0]) {
            metadata.pdfLink = namedLinks[0]._attributes.href;
        }
        if (unnamedLinks.length > 0 && "_attributes" in unnamedLinks[0]) {
            metadata.absLink = unnamedLinks[0]._attributes.href;
        }
        return metadata;
    }

    authorsToString(authors: string[], query): string {
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