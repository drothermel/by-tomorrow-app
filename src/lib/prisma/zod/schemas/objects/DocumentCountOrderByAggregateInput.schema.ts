import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DocumentCountOrderByAggregateInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		documentText: z.lazy(() => SortOrderSchema).optional(),
		documentTextHistory: z.lazy(() => SortOrderSchema).optional(),
		documentContents: z.lazy(() => SortOrderSchema).optional(),
		tags: z.lazy(() => SortOrderSchema).optional(),
		linkedPapers: z.lazy(() => SortOrderSchema).optional(),
		linkedQuestions: z.lazy(() => SortOrderSchema).optional(),
		linkedClaims: z.lazy(() => SortOrderSchema).optional(),
		linkedTopics: z.lazy(() => SortOrderSchema).optional(),
		linkedSnippets: z.lazy(() => SortOrderSchema).optional(),
		includedInDocuments: z.lazy(() => SortOrderSchema).optional(),
		roamPage: z.lazy(() => SortOrderSchema).optional(),
		created_at: z.lazy(() => SortOrderSchema).optional(),
		updated_at: z.lazy(() => SortOrderSchema).optional(),
	})
	.strict()

export const DocumentCountOrderByAggregateInputObjectSchema = Schema
