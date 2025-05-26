import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { DocumentCountOrderByAggregateInputObjectSchema } from './DocumentCountOrderByAggregateInput.schema'
import { DocumentAvgOrderByAggregateInputObjectSchema } from './DocumentAvgOrderByAggregateInput.schema'
import { DocumentMaxOrderByAggregateInputObjectSchema } from './DocumentMaxOrderByAggregateInput.schema'
import { DocumentMinOrderByAggregateInputObjectSchema } from './DocumentMinOrderByAggregateInput.schema'
import { DocumentSumOrderByAggregateInputObjectSchema } from './DocumentSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DocumentOrderByWithAggregationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		documentText: z.lazy(() => SortOrderSchema).optional(),
		documentTextHistory: z.lazy(() => SortOrderSchema).optional(),
		documentContents: z.lazy(() => SortOrderSchema).optional(),
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
		linkedSnippets: z.lazy(() => SortOrderSchema).optional(),
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
			.lazy(() => DocumentCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => DocumentAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => DocumentMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => DocumentMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => DocumentSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict()

export const DocumentOrderByWithAggregationInputObjectSchema = Schema
