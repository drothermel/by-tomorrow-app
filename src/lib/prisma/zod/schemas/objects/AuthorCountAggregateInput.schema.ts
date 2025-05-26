import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorCountAggregateInputType> = z
	.object({
		id: z.literal(true).optional(),
		name: z.literal(true).optional(),
		tags: z.literal(true).optional(),
		institutions: z.literal(true).optional(),
		links: z.literal(true).optional(),
		papers: z.literal(true).optional(),
		claims: z.literal(true).optional(),
		topics: z.literal(true).optional(),
		documents: z.literal(true).optional(),
		referencedInDocuments: z.literal(true).optional(),
		notes: z.literal(true).optional(),
		_all: z.literal(true).optional(),
	})
	.strict()

export const AuthorCountAggregateInputObjectSchema = Schema
