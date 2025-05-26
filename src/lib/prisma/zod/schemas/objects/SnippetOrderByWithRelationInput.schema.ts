import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SnippetOrderByWithRelationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		snippet: z.lazy(() => SortOrderSchema).optional(),
		snippetHistory: z.lazy(() => SortOrderSchema).optional(),
		tags: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		linkedPapers: z.lazy(() => SortOrderSchema).optional(),
		linkedQuestions: z.lazy(() => SortOrderSchema).optional(),
		linkedClaims: z.lazy(() => SortOrderSchema).optional(),
		linkedTopics: z.lazy(() => SortOrderSchema).optional(),
		linkedDocuments: z.lazy(() => SortOrderSchema).optional(),
		includedInDocuments: z.lazy(() => SortOrderSchema).optional(),
		roamPage: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputObjectSchema),
			])
			.optional(),
		created_at: z.lazy(() => SortOrderSchema).optional(),
		updated_at: z.lazy(() => SortOrderSchema).optional(),
	})
	.strict()

export const SnippetOrderByWithRelationInputObjectSchema = Schema
