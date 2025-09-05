import { z } from 'zod'
import { ClaimCreateManyInputObjectSchema } from './objects/ClaimCreateManyInput.schema'

export const ClaimCreateManySchema = z.object({
	data: z.union([
		ClaimCreateManyInputObjectSchema,
		z.array(ClaimCreateManyInputObjectSchema),
	]),
	skipDuplicates: z.boolean().optional(),
})
