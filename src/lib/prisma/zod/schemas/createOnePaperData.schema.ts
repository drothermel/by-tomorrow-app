import { z } from 'zod'
import { PaperDataCreateInputObjectSchema } from './objects/PaperDataCreateInput.schema'
import { PaperDataUncheckedCreateInputObjectSchema } from './objects/PaperDataUncheckedCreateInput.schema'

export const PaperDataCreateOneSchema = z.object({
	data: z.union([
		PaperDataCreateInputObjectSchema,
		PaperDataUncheckedCreateInputObjectSchema,
	]),
})
