import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { PaperMetadataCountOrderByAggregateInputObjectSchema } from './PaperMetadataCountOrderByAggregateInput.schema'
import { PaperMetadataAvgOrderByAggregateInputObjectSchema } from './PaperMetadataAvgOrderByAggregateInput.schema'
import { PaperMetadataMaxOrderByAggregateInputObjectSchema } from './PaperMetadataMaxOrderByAggregateInput.schema'
import { PaperMetadataMinOrderByAggregateInputObjectSchema } from './PaperMetadataMinOrderByAggregateInput.schema'
import { PaperMetadataSumOrderByAggregateInputObjectSchema } from './PaperMetadataSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataOrderByWithAggregationInput> = z
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
		_count: z
			.lazy(() => PaperMetadataCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z
			.lazy(() => PaperMetadataAvgOrderByAggregateInputObjectSchema)
			.optional(),
		_max: z
			.lazy(() => PaperMetadataMaxOrderByAggregateInputObjectSchema)
			.optional(),
		_min: z
			.lazy(() => PaperMetadataMinOrderByAggregateInputObjectSchema)
			.optional(),
		_sum: z
			.lazy(() => PaperMetadataSumOrderByAggregateInputObjectSchema)
			.optional(),
	})
	.strict()

export const PaperMetadataOrderByWithAggregationInputObjectSchema = Schema
