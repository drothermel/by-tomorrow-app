import { z } from 'zod'
import { PaperMetadataUpdateInputObjectSchema } from './objects/PaperMetadataUpdateInput.schema'
import { PaperMetadataUncheckedUpdateInputObjectSchema } from './objects/PaperMetadataUncheckedUpdateInput.schema'
import { PaperMetadataWhereUniqueInputObjectSchema } from './objects/PaperMetadataWhereUniqueInput.schema'

export const PaperMetadataUpdateOneSchema = z.object({
	data: z.union([
		PaperMetadataUpdateInputObjectSchema,
		PaperMetadataUncheckedUpdateInputObjectSchema,
	]),
	where: PaperMetadataWhereUniqueInputObjectSchema,
})
