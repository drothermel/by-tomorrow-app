import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SnippetCreatelinkedClaimsInput> = z
	.object({
		set: z.number().array(),
	})
	.strict()

export const SnippetCreatelinkedClaimsInputObjectSchema = Schema
