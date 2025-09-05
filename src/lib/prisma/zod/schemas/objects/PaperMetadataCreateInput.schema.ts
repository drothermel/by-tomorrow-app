import { z } from 'zod'
import { PaperMetadataCreateauthorIdsInputObjectSchema } from './PaperMetadataCreateauthorIdsInput.schema'
import { PaperMetadataCreatelinkedQuestionsInputObjectSchema } from './PaperMetadataCreatelinkedQuestionsInput.schema'
import { PaperMetadataCreatelinkedClaimsInputObjectSchema } from './PaperMetadataCreatelinkedClaimsInput.schema'
import { PaperMetadataCreatelinkedTopicsInputObjectSchema } from './PaperMetadataCreatelinkedTopicsInput.schema'
import { PaperMetadataCreatelinkedDocumentsInputObjectSchema } from './PaperMetadataCreatelinkedDocumentsInput.schema'
import { PaperMetadataCreatelinkedSnippetsInputObjectSchema } from './PaperMetadataCreatelinkedSnippetsInput.schema'
import { PaperMetadataCreateincludedInDocumentsInputObjectSchema } from './PaperMetadataCreateincludedInDocumentsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataCreateInput> = z
	.object({
		arxivId: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date(),
		title: z.string(),
		abstract: z.string(),
		authors: z.string(),
		authorIds: z
			.union([
				z.lazy(() => PaperMetadataCreateauthorIdsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		absLink: z.string(),
		pdfLink: z.string(),
		categories: z.string(),
		primaryCategory: z.string(),
		comments: z.string().optional().nullable(),
		tags: z.string().optional().nullable(),
		linkedQuestions: z
			.union([
				z.lazy(() => PaperMetadataCreatelinkedQuestionsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedClaims: z
			.union([
				z.lazy(() => PaperMetadataCreatelinkedClaimsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedTopics: z
			.union([
				z.lazy(() => PaperMetadataCreatelinkedTopicsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedDocuments: z
			.union([
				z.lazy(() => PaperMetadataCreatelinkedDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		linkedSnippets: z
			.union([
				z.lazy(() => PaperMetadataCreatelinkedSnippetsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		includedInDocuments: z
			.union([
				z.lazy(() => PaperMetadataCreateincludedInDocumentsInputObjectSchema),
				z.number().array(),
			])
			.optional(),
		roamPage: z.string().optional().nullable(),
		read: z.string().optional(),
		paperDataViewParams: z.string().optional().nullable(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const PaperMetadataCreateInputObjectSchema = Schema
