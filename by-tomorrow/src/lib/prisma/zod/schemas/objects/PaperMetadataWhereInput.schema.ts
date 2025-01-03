import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => PaperMetadataWhereInputObjectSchema),
				z.lazy(() => PaperMetadataWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => PaperMetadataWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PaperMetadataWhereInputObjectSchema),
				z.lazy(() => PaperMetadataWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
		arxivId: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		published: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		updated: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		title: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		abstract: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		authors: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		absLink: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		pdfLink: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		categories: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		primaryCategory: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		comments: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		tags: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		created_at: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		updated_at: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
	})
	.strict()

export const PaperMetadataWhereInputObjectSchema = Schema
