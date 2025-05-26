import { z } from 'zod'
import { TopicCreatetopicHistoryInputObjectSchema } from './TopicCreatetopicHistoryInput.schema'
import { TopicCreatelinkedPapersInputObjectSchema } from './TopicCreatelinkedPapersInput.schema'
import { TopicCreatelinkedQuestionsInputObjectSchema } from './TopicCreatelinkedQuestionsInput.schema'
import { TopicCreatelinkedClaimsInputObjectSchema } from './TopicCreatelinkedClaimsInput.schema'
import { TopicCreatelinkedDocumentsInputObjectSchema } from './TopicCreatelinkedDocumentsInput.schema'
import { TopicCreatelinkedSnippetsInputObjectSchema } from './TopicCreatelinkedSnippetsInput.schema'
import { TopicCreateincludedInDocumentsInputObjectSchema } from './TopicCreateincludedInDocumentsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.TopicCreateInput> = z
	.object({
		topic: z.string(),
		topicHistory: z
			.union([
				z.lazy(() => TopicCreatetopicHistoryInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		tags: z.string().optional().nullable(),
		linkedPapers: z
			.union([
				z.lazy(() => TopicCreatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => TopicCreatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => TopicCreatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => TopicCreatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => TopicCreatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => TopicCreateincludedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		roamPage: z.string().optional().nullable(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const TopicCreateInputObjectSchema = Schema
