import { z } from 'zod'
import { AuthorCreatetagsInputObjectSchema } from './AuthorCreatetagsInput.schema'
import { AuthorCreateinstitutionsInputObjectSchema } from './AuthorCreateinstitutionsInput.schema'
import { AuthorCreatelinksInputObjectSchema } from './AuthorCreatelinksInput.schema'
import { AuthorCreatepapersInputObjectSchema } from './AuthorCreatepapersInput.schema'
import { AuthorCreateclaimsInputObjectSchema } from './AuthorCreateclaimsInput.schema'
import { AuthorCreatetopicsInputObjectSchema } from './AuthorCreatetopicsInput.schema'
import { AuthorCreatedocumentsInputObjectSchema } from './AuthorCreatedocumentsInput.schema'
import { AuthorCreatereferencedInDocumentsInputObjectSchema } from './AuthorCreatereferencedInDocumentsInput.schema'
import { AuthorCreatenotesInputObjectSchema } from './AuthorCreatenotesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorCreateManyInput> = z
	.object({
		id: z.number().optional(),
		name: z.string(),
		tags: z
			.union([
				z.lazy(() => AuthorCreatetagsInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		institutions: z
			.union([
				z.lazy(() => AuthorCreateinstitutionsInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		links: z
			.union([
				z.lazy(() => AuthorCreatelinksInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		papers: z
			.union([
				z.lazy(() => AuthorCreatepapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		claims: z
			.union([
				z.lazy(() => AuthorCreateclaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		topics: z
			.union([
				z.lazy(() => AuthorCreatetopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		documents: z
			.union([
				z.lazy(() => AuthorCreatedocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		referencedInDocuments: z
			.union([
				z.lazy(() => AuthorCreatereferencedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		notes: z
			.union([
				z.lazy(() => AuthorCreatenotesInputObjectSchema),
				z.string().array(),
			])
			.optional(),
	})
	.strict()

export const AuthorCreateManyInputObjectSchema = Schema
