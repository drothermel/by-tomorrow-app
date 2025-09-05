import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { PaperDataCountOrderByAggregateInputObjectSchema } from './PaperDataCountOrderByAggregateInput.schema'
import { PaperDataAvgOrderByAggregateInputObjectSchema } from './PaperDataAvgOrderByAggregateInput.schema'
import { PaperDataMaxOrderByAggregateInputObjectSchema } from './PaperDataMaxOrderByAggregateInput.schema'
import { PaperDataMinOrderByAggregateInputObjectSchema } from './PaperDataMinOrderByAggregateInput.schema'
import { PaperDataSumOrderByAggregateInputObjectSchema } from './PaperDataSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperDataOrderByWithAggregationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		arxivId: z.lazy(() => SortOrderSchema).optional(),
		paperText: z.lazy(() => SortOrderSchema).optional(),
		paperDataStr: z.lazy(() => SortOrderSchema).optional(),
		created_at: z.lazy(() => SortOrderSchema).optional(),
		updated_at: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => PaperDataCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z
			.lazy(() => PaperDataAvgOrderByAggregateInputObjectSchema)
			.optional(),
		_max: z
			.lazy(() => PaperDataMaxOrderByAggregateInputObjectSchema)
			.optional(),
		_min: z
			.lazy(() => PaperDataMinOrderByAggregateInputObjectSchema)
			.optional(),
		_sum: z
			.lazy(() => PaperDataSumOrderByAggregateInputObjectSchema)
			.optional(),
	})
	.strict()

export const PaperDataOrderByWithAggregationInputObjectSchema = Schema
