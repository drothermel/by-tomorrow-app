import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { QuestionCountOrderByAggregateInputObjectSchema } from './QuestionCountOrderByAggregateInput.schema'
import { QuestionAvgOrderByAggregateInputObjectSchema } from './QuestionAvgOrderByAggregateInput.schema'
import { QuestionMaxOrderByAggregateInputObjectSchema } from './QuestionMaxOrderByAggregateInput.schema'
import { QuestionMinOrderByAggregateInputObjectSchema } from './QuestionMinOrderByAggregateInput.schema'
import { QuestionSumOrderByAggregateInputObjectSchema } from './QuestionSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.QuestionOrderByWithAggregationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		question: z.lazy(() => SortOrderSchema).optional(),
		questionHistory: z.lazy(() => SortOrderSchema).optional(),
		tags: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		linkedPapers: z.lazy(() => SortOrderSchema).optional(),
		linkedClaims: z.lazy(() => SortOrderSchema).optional(),
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
			.lazy(() => QuestionCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => QuestionAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => QuestionMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => QuestionMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => QuestionSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict()

export const QuestionOrderByWithAggregationInputObjectSchema = Schema
