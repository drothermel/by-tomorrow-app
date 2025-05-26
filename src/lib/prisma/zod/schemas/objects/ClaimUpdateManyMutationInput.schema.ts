import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { ClaimUpdateclaimHistoryInputObjectSchema } from './ClaimUpdateclaimHistoryInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { ClaimUpdatelinkedPapersInputObjectSchema } from './ClaimUpdatelinkedPapersInput.schema'
import { ClaimUpdatelinkedQuestionsInputObjectSchema } from './ClaimUpdatelinkedQuestionsInput.schema'
import { ClaimUpdatelinkedTopicsInputObjectSchema } from './ClaimUpdatelinkedTopicsInput.schema'
import { ClaimUpdatelinkedDocumentsInputObjectSchema } from './ClaimUpdatelinkedDocumentsInput.schema'
import { ClaimUpdatelinkedSnippetsInputObjectSchema } from './ClaimUpdatelinkedSnippetsInput.schema'
import { ClaimUpdateincludedInDocumentsInputObjectSchema } from './ClaimUpdateincludedInDocumentsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ClaimUpdateManyMutationInput> = z
	.object({
		claim: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		claimHistory: z
			.union([
				z.lazy(() => ClaimUpdateclaimHistoryInputObjectSchema),
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
				z.lazy(() => ClaimUpdatelinkedPapersInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedQuestions: z
			.union([
				z.lazy(() => ClaimUpdatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => ClaimUpdatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => ClaimUpdatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => ClaimUpdatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => ClaimUpdateincludedInDocumentsInputObjectSchema),
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

export const ClaimUpdateManyMutationInputObjectSchema = Schema
