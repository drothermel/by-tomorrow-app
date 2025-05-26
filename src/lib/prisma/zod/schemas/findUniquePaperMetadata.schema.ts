import { z } from 'zod'
import { PaperMetadataWhereUniqueInputObjectSchema } from './objects/PaperMetadataWhereUniqueInput.schema'

export const PaperMetadataFindUniqueSchema = z.object({
	where: PaperMetadataWhereUniqueInputObjectSchema,
})
