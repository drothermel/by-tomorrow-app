import { z } from 'zod'
import { DocumentCreatedocumentTextHistoryInputObjectSchema } from './DocumentCreatedocumentTextHistoryInput.schema'
import { DocumentCreatedocumentContentsInputObjectSchema } from './DocumentCreatedocumentContentsInput.schema'
import { DocumentCreatelinkedPapersInputObjectSchema } from './DocumentCreatelinkedPapersInput.schema'
import { DocumentCreatelinkedQuestionsInputObjectSchema } from './DocumentCreatelinkedQuestionsInput.schema'
import { DocumentCreatelinkedClaimsInputObjectSchema } from './DocumentCreatelinkedClaimsInput.schema'
import { DocumentCreatelinkedTopicsInputObjectSchema } from './DocumentCreatelinkedTopicsInput.schema'
import { DocumentCreatelinkedSnippetsInputObjectSchema } from './DocumentCreatelinkedSnippetsInput.schema'
import { DocumentCreateincludedInDocumentsInputObjectSchema } from './DocumentCreateincludedInDocumentsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DocumentCreateManyInput> = z
	.object({
		id: z.number().optional(),
		documentText: z.string(),
		documentTextHistory: z
			.union([
				z.lazy(() => DocumentCreatedocumentTextHistoryInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		documentContents: z
			.union([
				z.lazy(() => DocumentCreatedocumentContentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		tags: z.string().optional().nullable(),
		linkedPapers: z
			.union([
				z.lazy(() => DocumentCreatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => DocumentCreatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => DocumentCreatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => DocumentCreatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => DocumentCreatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => DocumentCreateincludedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		roamPage: z.string().optional().nullable(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const DocumentCreateManyInputObjectSchema = Schema
