import { z } from 'zod'
import { PaperMetadataWhereInputObjectSchema } from './objects/PaperMetadataWhereInput.schema'

export const PaperMetadataDeleteManySchema = z.object({
	where: PaperMetadataWhereInputObjectSchema.optional(),
})
