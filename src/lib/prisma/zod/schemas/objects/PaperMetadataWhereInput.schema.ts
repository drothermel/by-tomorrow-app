import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema'
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
		authorIds: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
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
		linkedQuestions: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedClaims: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedTopics: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedDocuments: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedSnippets: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		includedInDocuments: z
			.lazy(() => IntNullableListFilterObjectSchema)
			.optional(),
		roamPage: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		read: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		paperDataViewParams: z
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
