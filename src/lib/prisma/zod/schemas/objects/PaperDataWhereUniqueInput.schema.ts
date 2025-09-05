import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperDataWhereUniqueInput> = z
	.object({
		id: z.number().optional(),
		arxivId: z.string().optional(),
	})
	.strict()

export const PaperDataWhereUniqueInputObjectSchema = Schema
