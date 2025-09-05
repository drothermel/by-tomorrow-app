import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.QuestionCountAggregateInputType> = z
	.object({
		id: z.literal(true).optional(),
		question: z.literal(true).optional(),
		questionHistory: z.literal(true).optional(),
		tags: z.literal(true).optional(),
		linkedPapers: z.literal(true).optional(),
		linkedClaims: z.literal(true).optional(),
		linkedTopics: z.literal(true).optional(),
		linkedDocuments: z.literal(true).optional(),
		linkedSnippets: z.literal(true).optional(),
		includedInDocuments: z.literal(true).optional(),
		roamPage: z.literal(true).optional(),
		created_at: z.literal(true).optional(),
		updated_at: z.literal(true).optional(),
		_all: z.literal(true).optional(),
	})
	.strict()

export const QuestionCountAggregateInputObjectSchema = Schema
