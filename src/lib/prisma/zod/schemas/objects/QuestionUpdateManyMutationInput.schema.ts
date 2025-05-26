import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { QuestionUpdatequestionHistoryInputObjectSchema } from './QuestionUpdatequestionHistoryInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { QuestionUpdatelinkedPapersInputObjectSchema } from './QuestionUpdatelinkedPapersInput.schema'
import { QuestionUpdatelinkedClaimsInputObjectSchema } from './QuestionUpdatelinkedClaimsInput.schema'
import { QuestionUpdatelinkedTopicsInputObjectSchema } from './QuestionUpdatelinkedTopicsInput.schema'
import { QuestionUpdatelinkedDocumentsInputObjectSchema } from './QuestionUpdatelinkedDocumentsInput.schema'
import { QuestionUpdatelinkedSnippetsInputObjectSchema } from './QuestionUpdatelinkedSnippetsInput.schema'
import { QuestionUpdateincludedInDocumentsInputObjectSchema } from './QuestionUpdateincludedInDocumentsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.QuestionUpdateManyMutationInput> = z
	.object({
		question: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		questionHistory: z
			.union([
				z.lazy(() => QuestionUpdatequestionHistoryInputObjectSchema),
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
				z.lazy(() => QuestionUpdatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => QuestionUpdatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => QuestionUpdatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => QuestionUpdatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => QuestionUpdatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => QuestionUpdateincludedInDocumentsInputObjectSchema),
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

export const QuestionUpdateManyMutationInputObjectSchema = Schema
