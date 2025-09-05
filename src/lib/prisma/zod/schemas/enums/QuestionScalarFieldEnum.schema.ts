import { z } from 'zod'

export const QuestionScalarFieldEnumSchema = z.enum([
	'id',
	'question',
	'questionHistory',
	'tags',
	'linkedPapers',
	'linkedClaims',
	'linkedTopics',
	'linkedDocuments',
	'linkedSnippets',
	'includedInDocuments',
	'roamPage',
	'created_at',
	'updated_at',
])
