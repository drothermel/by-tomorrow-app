import { z } from 'zod'
import { PaperDataCreateManyInputObjectSchema } from './objects/PaperDataCreateManyInput.schema'

export const PaperDataCreateManySchema = z.object({
	data: z.union([
		PaperDataCreateManyInputObjectSchema,
		z.array(PaperDataCreateManyInputObjectSchema),
	]),
	skipDuplicates: z.boolean().optional(),
})
