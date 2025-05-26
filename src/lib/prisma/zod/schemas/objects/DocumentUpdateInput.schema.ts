import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { DocumentUpdatedocumentTextHistoryInputObjectSchema } from './DocumentUpdatedocumentTextHistoryInput.schema'
import { DocumentUpdatedocumentContentsInputObjectSchema } from './DocumentUpdatedocumentContentsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { DocumentUpdatelinkedPapersInputObjectSchema } from './DocumentUpdatelinkedPapersInput.schema'
import { DocumentUpdatelinkedQuestionsInputObjectSchema } from './DocumentUpdatelinkedQuestionsInput.schema'
import { DocumentUpdatelinkedClaimsInputObjectSchema } from './DocumentUpdatelinkedClaimsInput.schema'
import { DocumentUpdatelinkedTopicsInputObjectSchema } from './DocumentUpdatelinkedTopicsInput.schema'
import { DocumentUpdatelinkedSnippetsInputObjectSchema } from './DocumentUpdatelinkedSnippetsInput.schema'
import { DocumentUpdateincludedInDocumentsInputObjectSchema } from './DocumentUpdateincludedInDocumentsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DocumentUpdateInput> = z
	.object({
		documentText: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		documentTextHistory: z
			.union([
				z.lazy(() => DocumentUpdatedocumentTextHistoryInputObjectSchema),
				z.string().array(),
			])
			.optional(),
		documentContents: z
			.union([
				z.lazy(() => DocumentUpdatedocumentContentsInputObjectSchema),
				z.number().array(),
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
				z.lazy(() => DocumentUpdatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => DocumentUpdatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => DocumentUpdatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => DocumentUpdatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => DocumentUpdatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => DocumentUpdateincludedInDocumentsInputObjectSchema),
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

export const DocumentUpdateInputObjectSchema = Schema
