import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { AuthorCountOrderByAggregateInputObjectSchema } from './AuthorCountOrderByAggregateInput.schema'
import { AuthorAvgOrderByAggregateInputObjectSchema } from './AuthorAvgOrderByAggregateInput.schema'
import { AuthorMaxOrderByAggregateInputObjectSchema } from './AuthorMaxOrderByAggregateInput.schema'
import { AuthorMinOrderByAggregateInputObjectSchema } from './AuthorMinOrderByAggregateInput.schema'
import { AuthorSumOrderByAggregateInputObjectSchema } from './AuthorSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorOrderByWithAggregationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		tags: z.lazy(() => SortOrderSchema).optional(),
		institutions: z.lazy(() => SortOrderSchema).optional(),
		links: z.lazy(() => SortOrderSchema).optional(),
		papers: z.lazy(() => SortOrderSchema).optional(),
		claims: z.lazy(() => SortOrderSchema).optional(),
		topics: z.lazy(() => SortOrderSchema).optional(),
		documents: z.lazy(() => SortOrderSchema).optional(),
		referencedInDocuments: z.lazy(() => SortOrderSchema).optional(),
		notes: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => AuthorCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => AuthorAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => AuthorMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => AuthorMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => AuthorSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict()

export const AuthorOrderByWithAggregationInputObjectSchema = Schema
