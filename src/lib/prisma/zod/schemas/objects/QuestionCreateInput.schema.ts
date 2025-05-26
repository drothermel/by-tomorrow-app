import { z } from 'zod'
import { QuestionCreatequestionHistoryInputObjectSchema } from './QuestionCreatequestionHistoryInput.schema'
import { QuestionCreatelinkedPapersInputObjectSchema } from './QuestionCreatelinkedPapersInput.schema'
import { QuestionCreatelinkedClaimsInputObjectSchema } from './QuestionCreatelinkedClaimsInput.schema'
import { QuestionCreatelinkedTopicsInputObjectSchema } from './QuestionCreatelinkedTopicsInput.schema'
import { QuestionCreatelinkedDocumentsInputObjectSchema } from './QuestionCreatelinkedDocumentsInput.schema'
import { QuestionCreatelinkedSnippetsInputObjectSchema } from './QuestionCreatelinkedSnippetsInput.schema'
import { QuestionCreateincludedInDocumentsInputObjectSchema } from './QuestionCreateincludedInDocumentsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.QuestionCreateInput> = z
	.object({
		question: z.string(),
		questionHistory: z
			.union([
				z.lazy(() => QuestionCreatequestionHistoryInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		tags: z.string().optional().nullable(),
		linkedPapers: z
			.union([
				z.lazy(() => QuestionCreatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => QuestionCreatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => QuestionCreatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => QuestionCreatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => QuestionCreatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => QuestionCreateincludedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		roamPage: z.string().optional().nullable(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const QuestionCreateInputObjectSchema = Schema
