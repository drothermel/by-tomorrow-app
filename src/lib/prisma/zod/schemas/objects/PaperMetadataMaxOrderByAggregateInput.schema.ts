import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataMaxOrderByAggregateInput> = z
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
		comments: z.lazy(() => SortOrderSchema).optional(),
		tags: z.lazy(() => SortOrderSchema).optional(),
		roamPage: z.lazy(() => SortOrderSchema).optional(),
		read: z.lazy(() => SortOrderSchema).optional(),
		paperDataViewParams: z.lazy(() => SortOrderSchema).optional(),
		created_at: z.lazy(() => SortOrderSchema).optional(),
		updated_at: z.lazy(() => SortOrderSchema).optional(),
	})
	.strict()

export const PaperMetadataMaxOrderByAggregateInputObjectSchema = Schema
