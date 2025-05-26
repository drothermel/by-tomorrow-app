import { z } from 'zod'
import { ClaimCreateclaimHistoryInputObjectSchema } from './ClaimCreateclaimHistoryInput.schema'
import { ClaimCreatelinkedPapersInputObjectSchema } from './ClaimCreatelinkedPapersInput.schema'
import { ClaimCreatelinkedQuestionsInputObjectSchema } from './ClaimCreatelinkedQuestionsInput.schema'
import { ClaimCreatelinkedTopicsInputObjectSchema } from './ClaimCreatelinkedTopicsInput.schema'
import { ClaimCreatelinkedDocumentsInputObjectSchema } from './ClaimCreatelinkedDocumentsInput.schema'
import { ClaimCreatelinkedSnippetsInputObjectSchema } from './ClaimCreatelinkedSnippetsInput.schema'
import { ClaimCreateincludedInDocumentsInputObjectSchema } from './ClaimCreateincludedInDocumentsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ClaimCreateInput> = z
	.object({
		claim: z.string(),
		claimHistory: z
			.union([
				z.lazy(() => ClaimCreateclaimHistoryInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		tags: z.string().optional().nullable(),
		linkedPapers: z
			.union([
				z.lazy(() => ClaimCreatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => ClaimCreatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => ClaimCreatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => ClaimCreatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => ClaimCreatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => ClaimCreateincludedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		roamPage: z.string().optional().nullable(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const ClaimCreateInputObjectSchema = Schema
