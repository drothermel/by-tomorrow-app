import { z } from 'zod'

export const PaperMetadataScalarFieldEnumSchema = z.enum([
	'id',
	'arxivId',
	'published',
	'updated',
	'title',
	'abstract',
	'authors',
	'absLink',
	'pdfLink',
	'categories',
	'primaryCategory',
	'comments',
	'tags',
	'created_at',
	'updated_at',
])
