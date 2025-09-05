import { z } from 'zod'

export const TopicScalarFieldEnumSchema = z.enum([
	'id',
	'topic',
	'topicHistory',
	'tags',
	'linkedPapers',
	'linkedQuestions',
	'linkedClaims',
	'linkedDocuments',
	'linkedSnippets',
	'includedInDocuments',
	'roamPage',
	'created_at',
	'updated_at',
])
