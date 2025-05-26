import { z } from 'zod'
import { PaperDataWhereInputObjectSchema } from './objects/PaperDataWhereInput.schema'

export const PaperDataDeleteManySchema = z.object({
	where: PaperDataWhereInputObjectSchema.optional(),
})
