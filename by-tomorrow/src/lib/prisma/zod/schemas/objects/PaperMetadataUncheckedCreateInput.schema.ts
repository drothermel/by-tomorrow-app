import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataUncheckedCreateInput> = z
	.object({
		id: z.number().optional(),
		arxivId: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date(),
		title: z.string(),
		abstract: z.string(),
		authors: z.string(),
		absLink: z.string(),
		pdfLink: z.string(),
		categories: z.string(),
		primaryCategory: z.string(),
		comments: z.string().optional().nullable(),
		tags: z.string().optional().nullable(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const PaperMetadataUncheckedCreateInputObjectSchema = Schema
