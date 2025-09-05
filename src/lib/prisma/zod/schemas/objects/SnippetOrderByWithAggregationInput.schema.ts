import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { SnippetCountOrderByAggregateInputObjectSchema } from './SnippetCountOrderByAggregateInput.schema'
import { SnippetAvgOrderByAggregateInputObjectSchema } from './SnippetAvgOrderByAggregateInput.schema'
import { SnippetMaxOrderByAggregateInputObjectSchema } from './SnippetMaxOrderByAggregateInput.schema'
import { SnippetMinOrderByAggregateInputObjectSchema } from './SnippetMinOrderByAggregateInput.schema'
import { SnippetSumOrderByAggregateInputObjectSchema } from './SnippetSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SnippetOrderByWithAggregationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		snippet: z.lazy(() => SortOrderSchema).optional(),
		snippetHistory: z.lazy(() => SortOrderSchema).optional(),
		tags: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		linkedPapers: z.lazy(() => SortOrderSchema).optional(),
		linkedQuestions: z.lazy(() => SortOrderSchema).optional(),
		linkedClaims: z.lazy(() => SortOrderSchema).optional(),
		linkedTopics: z.lazy(() => SortOrderSchema).optional(),
		linkedDocuments: z.lazy(() => SortOrderSchema).optional(),
		includedInDocuments: z.lazy(() => SortOrderSchema).optional(),
		roamPage: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		created_at: z.lazy(() => SortOrderSchema).optional(),
		updated_at: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => SnippetCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => SnippetAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => SnippetMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => SnippetMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => SnippetSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict()

export const SnippetOrderByWithAggregationInputObjectSchema = Schema
