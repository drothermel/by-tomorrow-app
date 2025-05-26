import { z } from 'zod'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { AuthorUpdatetagsInputObjectSchema } from './AuthorUpdatetagsInput.schema'
import { AuthorUpdateinstitutionsInputObjectSchema } from './AuthorUpdateinstitutionsInput.schema'
import { AuthorUpdatelinksInputObjectSchema } from './AuthorUpdatelinksInput.schema'
import { AuthorUpdatepapersInputObjectSchema } from './AuthorUpdatepapersInput.schema'
import { AuthorUpdateclaimsInputObjectSchema } from './AuthorUpdateclaimsInput.schema'
import { AuthorUpdatetopicsInputObjectSchema } from './AuthorUpdatetopicsInput.schema'
import { AuthorUpdatedocumentsInputObjectSchema } from './AuthorUpdatedocumentsInput.schema'
import { AuthorUpdatereferencedInDocumentsInputObjectSchema } from './AuthorUpdatereferencedInDocumentsInput.schema'
import { AuthorUpdatenotesInputObjectSchema } from './AuthorUpdatenotesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.AuthorUncheckedUpdateManyInput> = z
	.object({
		id: z
			.union([
				z.number(),
				z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		name: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		tags: z
			.union([
				z.lazy(() => AuthorUpdatetagsInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		institutions: z
			.union([
				z.lazy(() => AuthorUpdateinstitutionsInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		links: z
			.union([
				z.lazy(() => AuthorUpdatelinksInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		papers: z
			.union([
				z.lazy(() => AuthorUpdatepapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		claims: z
			.union([
				z.lazy(() => AuthorUpdateclaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		topics: z
			.union([
				z.lazy(() => AuthorUpdatetopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		documents: z
			.union([
				z.lazy(() => AuthorUpdatedocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		referencedInDocuments: z
			.union([
				z.lazy(() => AuthorUpdatereferencedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		notes: z
			.union([
				z.lazy(() => AuthorUpdatenotesInputObjectSchema),
				z.string().array(),
			])
			.optional(),
	})
	.strict()

export const AuthorUncheckedUpdateManyInputObjectSchema = Schema
