import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => AuthorWhereInputObjectSchema),
				z.lazy(() => AuthorWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => AuthorWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => AuthorWhereInputObjectSchema),
				z.lazy(() => AuthorWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
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

export const AuthorWhereInputObjectSchema = Schema
