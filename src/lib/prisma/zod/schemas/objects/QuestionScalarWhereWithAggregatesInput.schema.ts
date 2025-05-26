import { z } from 'zod'
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema'
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.QuestionScalarWhereWithAggregatesInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema),
				z
					.lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema)
					.array(),
			])
			.optional(),
		OR: z
			.lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema),
				z
					.lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema)
					.array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
			.optional(),
		question: z
			.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		questionHistory: z
			.lazy(() => StringNullableListFilterObjectSchema)
			.optional(),
		tags: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		linkedPapers: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedClaims: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedTopics: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedDocuments: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedSnippets: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		includedInDocuments: z
			.lazy(() => IntNullableListFilterObjectSchema)
			.optional(),
		roamPage: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		created_at: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
				z.coerce.date(),
			])
			.optional(),
		updated_at: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
				z.coerce.date(),
			])
			.optional(),
	})
	.strict()

export const QuestionScalarWhereWithAggregatesInputObjectSchema = Schema
