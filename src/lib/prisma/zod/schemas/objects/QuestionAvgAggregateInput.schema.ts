import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.QuestionAvgAggregateInputType> = z
	.object({
		id: z.literal(true).optional(),
		linkedPapers: z.literal(true).optional(),
		linkedClaims: z.literal(true).optional(),
		linkedTopics: z.literal(true).optional(),
		linkedDocuments: z.literal(true).optional(),
		linkedSnippets: z.literal(true).optional(),
		includedInDocuments: z.literal(true).optional(),
	})
	.strict()

export const QuestionAvgAggregateInputObjectSchema = Schema
