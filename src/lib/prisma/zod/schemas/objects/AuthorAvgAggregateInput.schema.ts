import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorAvgAggregateInputType> = z
	.object({
		id: z.literal(true).optional(),
		papers: z.literal(true).optional(),
		claims: z.literal(true).optional(),
		topics: z.literal(true).optional(),
		documents: z.literal(true).optional(),
		referencedInDocuments: z.literal(true).optional(),
	})
	.strict()

export const AuthorAvgAggregateInputObjectSchema = Schema
