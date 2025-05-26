import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SnippetMinAggregateInputType> = z
	.object({
		id: z.literal(true).optional(),
		snippet: z.literal(true).optional(),
		tags: z.literal(true).optional(),
		roamPage: z.literal(true).optional(),
		created_at: z.literal(true).optional(),
		updated_at: z.literal(true).optional(),
	})
	.strict()

export const SnippetMinAggregateInputObjectSchema = Schema
