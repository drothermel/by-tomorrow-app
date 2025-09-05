import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperDataUncheckedCreateInput> = z
	.object({
		id: z.number().optional(),
		arxivId: z.string(),
		paperText: z.string(),
		paperDataStr: z.string(),
		created_at: z.coerce.date().optional(),
		updated_at: z.coerce.date().optional(),
	})
	.strict()

export const PaperDataUncheckedCreateInputObjectSchema = Schema
