import { z } from 'zod'
import { PaperMetadataUpdateManyMutationInputObjectSchema } from './objects/PaperMetadataUpdateManyMutationInput.schema'
import { PaperMetadataWhereInputObjectSchema } from './objects/PaperMetadataWhereInput.schema'

export const PaperMetadataUpdateManySchema = z.object({
	data: PaperMetadataUpdateManyMutationInputObjectSchema,
	where: PaperMetadataWhereInputObjectSchema.optional(),
})
