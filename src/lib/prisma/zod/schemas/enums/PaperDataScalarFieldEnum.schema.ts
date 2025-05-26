import { z } from 'zod'

export const PaperDataScalarFieldEnumSchema = z.enum([
	'id',
	'arxivId',
	'paperText',
	'paperDataStr',
	'created_at',
	'updated_at',
])
