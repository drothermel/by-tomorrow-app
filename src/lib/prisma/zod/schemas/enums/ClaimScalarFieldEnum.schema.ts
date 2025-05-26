import { z } from 'zod'

export const ClaimScalarFieldEnumSchema = z.enum([
	'id',
	'claim',
	'claimHistory',
	'tags',
	'linkedPapers',
	'linkedQuestions',
	'linkedTopics',
	'linkedDocuments',
	'linkedSnippets',
	'includedInDocuments',
	'roamPage',
	'created_at',
	'updated_at',
])
