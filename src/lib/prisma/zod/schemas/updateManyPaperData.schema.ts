import { z } from 'zod'
import { PaperDataUpdateManyMutationInputObjectSchema } from './objects/PaperDataUpdateManyMutationInput.schema'
import { PaperDataWhereInputObjectSchema } from './objects/PaperDataWhereInput.schema'

export const PaperDataUpdateManySchema = z.object({
	data: PaperDataUpdateManyMutationInputObjectSchema,
	where: PaperDataWhereInputObjectSchema.optional(),
})
