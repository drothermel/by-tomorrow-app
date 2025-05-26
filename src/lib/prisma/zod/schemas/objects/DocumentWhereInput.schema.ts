import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DocumentWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => DocumentWhereInputObjectSchema),
				z.lazy(() => DocumentWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => DocumentWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => DocumentWhereInputObjectSchema),
				z.lazy(() => DocumentWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
		documentText: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		documentTextHistory: z
			.lazy(() => StringNullableListFilterObjectSchema)
			.optional(),
		documentContents: z
			.lazy(() => IntNullableListFilterObjectSchema)
			.optional(),
		tags: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		linkedPapers: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedQuestions: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedClaims: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedTopics: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedSnippets: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		includedInDocuments: z
			.lazy(() => IntNullableListFilterObjectSchema)
			.optional(),
		roamPage: z
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

export const DocumentWhereInputObjectSchema = Schema
