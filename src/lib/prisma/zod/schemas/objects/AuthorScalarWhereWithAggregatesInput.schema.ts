import { z } from 'zod'
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorScalarWhereWithAggregatesInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => AuthorScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => AuthorScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => AuthorScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => AuthorScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => AuthorScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
			.optional(),
		name: z
			.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
		institutions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
		links: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
		papers: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		claims: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		topics: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		documents: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
		referencedInDocuments: z
			.lazy(() => IntNullableListFilterObjectSchema)
			.optional(),
		notes: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
	})
	.strict()

export const AuthorScalarWhereWithAggregatesInputObjectSchema = Schema
