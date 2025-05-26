import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorCountOrderByAggregateInput> = z
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
	})
	.strict()

export const AuthorCountOrderByAggregateInputObjectSchema = Schema
