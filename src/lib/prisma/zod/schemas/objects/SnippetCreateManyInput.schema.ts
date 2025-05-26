import { z } from 'zod'
import { SnippetCreatesnippetHistoryInputObjectSchema } from './SnippetCreatesnippetHistoryInput.schema'
import { SnippetCreatelinkedPapersInputObjectSchema } from './SnippetCreatelinkedPapersInput.schema'
import { SnippetCreatelinkedQuestionsInputObjectSchema } from './SnippetCreatelinkedQuestionsInput.schema'
import { SnippetCreatelinkedClaimsInputObjectSchema } from './SnippetCreatelinkedClaimsInput.schema'
import { SnippetCreatelinkedTopicsInputObjectSchema } from './SnippetCreatelinkedTopicsInput.schema'
import { SnippetCreatelinkedDocumentsInputObjectSchema } from './SnippetCreatelinkedDocumentsInput.schema'
import { SnippetCreateincludedInDocumentsInputObjectSchema } from './SnippetCreateincludedInDocumentsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SnippetCreateManyInput> = z
	.object({
		id: z.number().optional(),
		snippet: z.string(),
		snippetHistory: z
			.union([
				z.lazy(() => SnippetCreatesnippetHistoryInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		tags: z.string().optional().nullable(),
		linkedPapers: z
			.union([
				z.lazy(() => SnippetCreatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => SnippetCreatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => SnippetCreatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => SnippetCreatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => SnippetCreatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => SnippetCreateincludedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		roamPage: z.string().optional().nullable(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const SnippetCreateManyInputObjectSchema = Schema
