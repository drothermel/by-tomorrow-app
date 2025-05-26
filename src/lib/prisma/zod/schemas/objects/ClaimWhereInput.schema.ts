import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ClaimWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => ClaimWhereInputObjectSchema),
				z.lazy(() => ClaimWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ClaimWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ClaimWhereInputObjectSchema),
				z.lazy(() => ClaimWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
		claim: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		claimHistory: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
		tags: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		linkedPapers: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		linkedQuestions: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
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
		created_at: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		updated_at: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
	})
	.strict()

export const ClaimWhereInputObjectSchema = Schema
