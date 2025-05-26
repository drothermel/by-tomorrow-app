import { z } from 'zod'
import { PaperDataWhereUniqueInputObjectSchema } from './objects/PaperDataWhereUniqueInput.schema'
import { PaperDataCreateInputObjectSchema } from './objects/PaperDataCreateInput.schema'
import { PaperDataUncheckedCreateInputObjectSchema } from './objects/PaperDataUncheckedCreateInput.schema'
import { PaperDataUpdateInputObjectSchema } from './objects/PaperDataUpdateInput.schema'
import { PaperDataUncheckedUpdateInputObjectSchema } from './objects/PaperDataUncheckedUpdateInput.schema'

export const PaperDataUpsertSchema = z.object({
	where: PaperDataWhereUniqueInputObjectSchema,
	create: z.union([
		PaperDataCreateInputObjectSchema,
		PaperDataUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		PaperDataUpdateInputObjectSchema,
		PaperDataUncheckedUpdateInputObjectSchema,
	]),
})
