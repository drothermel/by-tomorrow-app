import { z } from 'zod'
import { PaperDataWhereUniqueInputObjectSchema } from './objects/PaperDataWhereUniqueInput.schema'

export const PaperDataFindUniqueSchema = z.object({
	where: PaperDataWhereUniqueInputObjectSchema,
})
