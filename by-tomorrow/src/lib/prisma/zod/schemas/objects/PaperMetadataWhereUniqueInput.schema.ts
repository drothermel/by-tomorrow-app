import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperMetadataWhereUniqueInput> = z
	.object({
		id: z.number().optional(),
		arxivId: z.string().optional(),
	})
	.strict()

export const PaperMetadataWhereUniqueInputObjectSchema = Schema
