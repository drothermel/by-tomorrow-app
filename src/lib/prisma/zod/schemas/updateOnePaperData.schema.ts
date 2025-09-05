import { z } from 'zod'
import { PaperDataUpdateInputObjectSchema } from './objects/PaperDataUpdateInput.schema'
import { PaperDataUncheckedUpdateInputObjectSchema } from './objects/PaperDataUncheckedUpdateInput.schema'
import { PaperDataWhereUniqueInputObjectSchema } from './objects/PaperDataWhereUniqueInput.schema'

export const PaperDataUpdateOneSchema = z.object({
	data: z.union([
		PaperDataUpdateInputObjectSchema,
		PaperDataUncheckedUpdateInputObjectSchema,
	]),
	where: PaperDataWhereUniqueInputObjectSchema,
})
