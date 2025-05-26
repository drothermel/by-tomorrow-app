import { z } from 'zod'
import { PaperMetadataCreateInputObjectSchema } from './objects/PaperMetadataCreateInput.schema'
import { PaperMetadataUncheckedCreateInputObjectSchema } from './objects/PaperMetadataUncheckedCreateInput.schema'

export const PaperMetadataCreateOneSchema = z.object({
	data: z.union([
		PaperMetadataCreateInputObjectSchema,
		PaperMetadataUncheckedCreateInputObjectSchema,
	]),
})
