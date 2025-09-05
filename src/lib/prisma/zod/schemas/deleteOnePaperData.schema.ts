import { z } from 'zod'
import { PaperDataWhereUniqueInputObjectSchema } from './objects/PaperDataWhereUniqueInput.schema'

export const PaperDataDeleteOneSchema = z.object({
	where: PaperDataWhereUniqueInputObjectSchema,
})
