import { z } from "zod";
import { titleCase } from "title-case";

// Use: stringToDateSchema.parse("2021-09-01T00:00:00Z")
const stringToDateSchema = z.string().transform((val) => new Date(val));
const normalizeToArray = <T extends z.ZodTypeAny>(schema: T) =>
    z.union([z.array(schema), schema]).transform((data) =>
        Array.isArray(data) ? data : [data]
    );
const extractTextSchema = () =>
    z.object({ _text: z.string() }).transform((data) => data._text.replace(/\s+/g, " ").trim());
const optionalExtractTextSchema = z.optional(extractTextSchema());
function filterUndefined(obj: Object) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
}



/** Arxiv Query Schemas */
export const arxivSortByEnum = z.enum(["relevance", "lastUpdatedDate", "submittedDate"]);
export const arxivSortOrderEnum = z.enum(["ascending", "descending"]);
export const arxivQueryJoinTypeEnum = z.enum(['AND', 'OR', 'ANDNOT']);
export const arxivQuerySchema = z.object({
    start: z.number().optional().default(0),
    maxResults: z.number().optional().default(10),
    sortBy: arxivSortByEnum.optional().default("relevance"),
    sortOrder: arxivSortOrderEnum.optional().default("descending"),
    submittedDateMin: z.date().optional(),
    submittedDateMax: z.date().optional(),
    ids: z.union([z.string(), z.array(z.string())]).optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    abstract: z.string().optional(),
    comment: z.string().optional(),
    journal: z.string().optional(),
    category: z.string().optional(),
    reportNumber: z.string().optional(),
    all: z.string().optional(),
    joinType: arxivQueryJoinTypeEnum.optional().default("AND"),
});
export type ArxivQuery = z.infer<typeof arxivQuerySchema>;
export type SortByType = z.infer<typeof arxivSortByEnum>;

/** Arxiv Response Schemas */
export const arxivAuthorFieldSchema = z.object({
    name: extractTextSchema(),
}).passthrough().transform((data) => data.name);
export const arxivCategoryFieldSchema = z.object({
    _attributes: z.object({term: z.string()})
}).passthrough().transform((data) => data._attributes.term);
export const arxivLinkFieldSchema = z.object({
    _attributes: z.object({
        title: z.string().optional(),
        href: z.string(),
    })
})
.passthrough()
.transform((data) => {
    const href = data._attributes.href;
    const title = data._attributes.title;
    if (!title) {
        return { absLink: href };
    }
    if (title === "pdf") {
        return {pdfLink: href};
    }
    if (title === "doi") {
        return {doiLink: href};
    }
    return { [`${title}Link`]: href };
});

export const arxivEntrySchema = z.object({
    id: extractTextSchema(),
    updated: extractTextSchema(),
    published: extractTextSchema(),
    title: extractTextSchema().transform((data) => {return titleCase(data)}),
    summary: extractTextSchema(),
    author: normalizeToArray(z.union([
        arxivAuthorFieldSchema,
        z.array(arxivAuthorFieldSchema),
    ])),
    link: z.array(arxivLinkFieldSchema),
    category: normalizeToArray(z.union([
        arxivCategoryFieldSchema,
        z.array(arxivCategoryFieldSchema),
    ])),
    "arxiv:primary_category": arxivCategoryFieldSchema,
    "arxiv:comment": optionalExtractTextSchema,
}).passthrough()
.transform((data) => {
    const {
        ['arxiv:doi']: _, 
        ['arxiv:primary_category']: primaryCategory,
        ['arxiv:comment']: comment,
        link: _link,
        ...rest 
    } = data;
    let link_obj = {};
    for (const l of _link) {
        link_obj = {...link_obj, ...l};
    }
    const result = {...rest, primaryCategory, comment, "links": link_obj};
    return filterUndefined(result);
});
export const arxivMetadataSchema = z.object({
    id: z.string(),
    updated: z.string(),
    published: z.string(),
    title: z.string(),
    summary: z.string(),
    author: z.array(z.string()),
    links: z.object({
        absLink: z.string().optional(),
        pdfLink: z.string().optional(),
        doiLink: z.string().optional(),
    }),
    category: z.array(z.string()),
    primaryCategory: z.string(),
    comment: z.string().optional(),
})

export const arxivEntriesSchema = z.union([
    arxivEntrySchema,
    z.array(arxivEntrySchema),
])
export const arxivResponseSchema = z.object({
    feed: z.object({
        entry: normalizeToArray(arxivEntriesSchema)
    }),
}).passthrough().transform((data) => data.feed.entry);
export type ArxivMetadataList = z.infer<typeof arxivResponseSchema>;
export type ArxivMetadata = z.infer<typeof arxivEntrySchema>;