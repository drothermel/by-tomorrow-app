import { z } from 'zod'

export const AuthorScalarFieldEnumSchema = z.enum([
	'id',
	'name',
	'tags',
	'institutions',
	'links',
	'papers',
	'claims',
	'topics',
	'documents',
	'referencedInDocuments',
	'notes',
])
