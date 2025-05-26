import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataCountAggregateInputType> = z
	.object({
		id: z.literal(true).optional(),
		arxivId: z.literal(true).optional(),
		published: z.literal(true).optional(),
		updated: z.literal(true).optional(),
		title: z.literal(true).optional(),
		abstract: z.literal(true).optional(),
		authors: z.literal(true).optional(),
		authorIds: z.literal(true).optional(),
		absLink: z.literal(true).optional(),
		pdfLink: z.literal(true).optional(),
		categories: z.literal(true).optional(),
		primaryCategory: z.literal(true).optional(),
		comments: z.literal(true).optional(),
		tags: z.literal(true).optional(),
		linkedQuestions: z.literal(true).optional(),
		linkedClaims: z.literal(true).optional(),
		linkedTopics: z.literal(true).optional(),
		linkedDocuments: z.literal(true).optional(),
		linkedSnippets: z.literal(true).optional(),
		includedInDocuments: z.literal(true).optional(),
		roamPage: z.literal(true).optional(),
		read: z.literal(true).optional(),
		paperDataViewParams: z.literal(true).optional(),
		created_at: z.literal(true).optional(),
		updated_at: z.literal(true).optional(),
		_all: z.literal(true).optional(),
	})
	.strict()

export const PaperMetadataCountAggregateInputObjectSchema = Schema
