import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorSumOrderByAggregateInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		papers: z.lazy(() => SortOrderSchema).optional(),
		claims: z.lazy(() => SortOrderSchema).optional(),
		topics: z.lazy(() => SortOrderSchema).optional(),
		documents: z.lazy(() => SortOrderSchema).optional(),
		referencedInDocuments: z.lazy(() => SortOrderSchema).optional(),
	})
	.strict()

export const AuthorSumOrderByAggregateInputObjectSchema = Schema
