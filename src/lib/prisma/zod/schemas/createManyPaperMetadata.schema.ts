import { z } from 'zod'
import { PaperMetadataCreateManyInputObjectSchema } from './objects/PaperMetadataCreateManyInput.schema'

export const PaperMetadataCreateManySchema = z.object({
	data: z.union([
		PaperMetadataCreateManyInputObjectSchema,
		z.array(PaperMetadataCreateManyInputObjectSchema),
	]),
	skipDuplicates: z.boolean().optional(),
})
