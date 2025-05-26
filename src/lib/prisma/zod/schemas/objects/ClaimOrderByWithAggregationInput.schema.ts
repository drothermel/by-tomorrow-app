import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { ClaimCountOrderByAggregateInputObjectSchema } from './ClaimCountOrderByAggregateInput.schema'
import { ClaimAvgOrderByAggregateInputObjectSchema } from './ClaimAvgOrderByAggregateInput.schema'
import { ClaimMaxOrderByAggregateInputObjectSchema } from './ClaimMaxOrderByAggregateInput.schema'
import { ClaimMinOrderByAggregateInputObjectSchema } from './ClaimMinOrderByAggregateInput.schema'
import { ClaimSumOrderByAggregateInputObjectSchema } from './ClaimSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ClaimOrderByWithAggregationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		claim: z.lazy(() => SortOrderSchema).optional(),
		claimHistory: z.lazy(() => SortOrderSchema).optional(),
		tags: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		linkedPapers: z.lazy(() => SortOrderSchema).optional(),
		linkedQuestions: z.lazy(() => SortOrderSchema).optional(),
		linkedTopics: z.lazy(() => SortOrderSchema).optional(),
		linkedDocuments: z.lazy(() => SortOrderSchema).optional(),
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
			.lazy(() => ClaimCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => ClaimAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => ClaimMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => ClaimMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => ClaimSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict()

export const ClaimOrderByWithAggregationInputObjectSchema = Schema
