import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperDataMaxOrderByAggregateInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		arxivId: z.lazy(() => SortOrderSchema).optional(),
		paperText: z.lazy(() => SortOrderSchema).optional(),
		paperDataStr: z.lazy(() => SortOrderSchema).optional(),
		created_at: z.lazy(() => SortOrderSchema).optional(),
		updated_at: z.lazy(() => SortOrderSchema).optional(),
	})
	.strict()

export const PaperDataMaxOrderByAggregateInputObjectSchema = Schema
