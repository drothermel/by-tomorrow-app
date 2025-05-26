import { z } from 'zod'
import { ClaimUpdateInputObjectSchema } from './objects/ClaimUpdateInput.schema'
import { ClaimUncheckedUpdateInputObjectSchema } from './objects/ClaimUncheckedUpdateInput.schema'
import { ClaimWhereUniqueInputObjectSchema } from './objects/ClaimWhereUniqueInput.schema'

export const ClaimUpdateOneSchema = z.object({
	data: z.union([
		ClaimUpdateInputObjectSchema,
		ClaimUncheckedUpdateInputObjectSchema,
	]),
	where: ClaimWhereUniqueInputObjectSchema,
})
