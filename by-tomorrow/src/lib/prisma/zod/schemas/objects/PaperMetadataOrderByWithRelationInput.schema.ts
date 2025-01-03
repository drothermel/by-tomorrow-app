import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataOrderByWithRelationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		arxivId: z.lazy(() => SortOrderSchema).optional(),
		published: z.lazy(() => SortOrderSchema).optional(),
		updated: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		abstract: z.lazy(() => SortOrderSchema).optional(),
		authors: z.lazy(() => SortOrderSchema).optional(),
		absLink: z.lazy(() => SortOrderSchema).optional(),
		pdfLink: z.lazy(() => SortOrderSchema).optional(),
		categories: z.lazy(() => SortOrderSchema).optional(),
		primaryCategory: z.lazy(() => SortOrderSchema).optional(),
		comments: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		tags: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		created_at: z.lazy(() => SortOrderSchema).optional(),
		updated_at: z.lazy(() => SortOrderSchema).optional(),
	})
	.strict()

export const PaperMetadataOrderByWithRelationInputObjectSchema = Schema
