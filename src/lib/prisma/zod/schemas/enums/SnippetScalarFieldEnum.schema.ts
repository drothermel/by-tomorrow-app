import { z } from 'zod'

export const SnippetScalarFieldEnumSchema = z.enum([
	'id',
	'snippet',
	'snippetHistory',
	'tags',
	'linkedPapers',
	'linkedQuestions',
	'linkedClaims',
	'linkedTopics',
	'linkedDocuments',
	'includedInDocuments',
	'roamPage',
	'created_at',
	'updated_at',
])
