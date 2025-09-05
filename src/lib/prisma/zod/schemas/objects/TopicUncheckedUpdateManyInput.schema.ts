import { z } from 'zod'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { TopicUpdatetopicHistoryInputObjectSchema } from './TopicUpdatetopicHistoryInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { TopicUpdatelinkedPapersInputObjectSchema } from './TopicUpdatelinkedPapersInput.schema'
import { TopicUpdatelinkedQuestionsInputObjectSchema } from './TopicUpdatelinkedQuestionsInput.schema'
import { TopicUpdatelinkedClaimsInputObjectSchema } from './TopicUpdatelinkedClaimsInput.schema'
import { TopicUpdatelinkedDocumentsInputObjectSchema } from './TopicUpdatelinkedDocumentsInput.schema'
import { TopicUpdatelinkedSnippetsInputObjectSchema } from './TopicUpdatelinkedSnippetsInput.schema'
import { TopicUpdateincludedInDocumentsInputObjectSchema } from './TopicUpdateincludedInDocumentsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.TopicUncheckedUpdateManyInput> = z
	.object({
		id: z
			.union([
				z.number(),
				z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		topic: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		topicHistory: z
			.union([
				z.lazy(() => TopicUpdatetopicHistoryInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		tags: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.optional()
			.nullable(),
		linkedPapers: z
			.union([
				z.lazy(() => TopicUpdatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => TopicUpdatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => TopicUpdatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => TopicUpdatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => TopicUpdatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => TopicUpdateincludedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		roamPage: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.optional()
			.nullable(),
		created_at: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		updated_at: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
	})
	.strict()

export const TopicUncheckedUpdateManyInputObjectSchema = Schema
