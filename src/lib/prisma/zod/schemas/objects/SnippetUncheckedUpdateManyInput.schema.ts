import { z } from 'zod'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { SnippetUpdatesnippetHistoryInputObjectSchema } from './SnippetUpdatesnippetHistoryInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { SnippetUpdatelinkedPapersInputObjectSchema } from './SnippetUpdatelinkedPapersInput.schema'
import { SnippetUpdatelinkedQuestionsInputObjectSchema } from './SnippetUpdatelinkedQuestionsInput.schema'
import { SnippetUpdatelinkedClaimsInputObjectSchema } from './SnippetUpdatelinkedClaimsInput.schema'
import { SnippetUpdatelinkedTopicsInputObjectSchema } from './SnippetUpdatelinkedTopicsInput.schema'
import { SnippetUpdatelinkedDocumentsInputObjectSchema } from './SnippetUpdatelinkedDocumentsInput.schema'
import { SnippetUpdateincludedInDocumentsInputObjectSchema } from './SnippetUpdateincludedInDocumentsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SnippetUncheckedUpdateManyInput> = z
	.object({
		id: z
			.union([
				z.number(),
				z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		snippet: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		snippetHistory: z
			.union([
				z.lazy(() => SnippetUpdatesnippetHistoryInputObjectSchema),
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
				z.lazy(() => SnippetUpdatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => SnippetUpdatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => SnippetUpdatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => SnippetUpdatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => SnippetUpdatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => SnippetUpdateincludedInDocumentsInputObjectSchema),
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

export const SnippetUncheckedUpdateManyInputObjectSchema = Schema
