import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { TopicCountOrderByAggregateInputObjectSchema } from './TopicCountOrderByAggregateInput.schema'
import { TopicAvgOrderByAggregateInputObjectSchema } from './TopicAvgOrderByAggregateInput.schema'
import { TopicMaxOrderByAggregateInputObjectSchema } from './TopicMaxOrderByAggregateInput.schema'
import { TopicMinOrderByAggregateInputObjectSchema } from './TopicMinOrderByAggregateInput.schema'
import { TopicSumOrderByAggregateInputObjectSchema } from './TopicSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.TopicOrderByWithAggregationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		topic: z.lazy(() => SortOrderSchema).optional(),
		topicHistory: z.lazy(() => SortOrderSchema).optional(),
		tags: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		linkedPapers: z.lazy(() => SortOrderSchema).optional(),
		linkedQuestions: z.lazy(() => SortOrderSchema).optional(),
		linkedClaims: z.lazy(() => SortOrderSchema).optional(),
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
			.lazy(() => TopicCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => TopicAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => TopicMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => TopicMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => TopicSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict()

export const TopicOrderByWithAggregationInputObjectSchema = Schema
