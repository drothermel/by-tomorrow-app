import { z } from 'zod'
import { PaperMetadataWhereUniqueInputObjectSchema } from './objects/PaperMetadataWhereUniqueInput.schema'

export const PaperMetadataDeleteOneSchema = z.object({
	where: PaperMetadataWhereUniqueInputObjectSchema,
})
