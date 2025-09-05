import { z } from 'zod'

export const DocumentScalarFieldEnumSchema = z.enum([
	'id',
	'documentText',
	'documentTextHistory',
	'documentContents',
	'tags',
	'linkedPapers',
	'linkedQuestions',
	'linkedClaims',
	'linkedTopics',
	'linkedSnippets',
	'includedInDocuments',
	'roamPage',
	'created_at',
	'updated_at',
])
