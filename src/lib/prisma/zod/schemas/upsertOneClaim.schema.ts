import { z } from 'zod'
import { ClaimWhereUniqueInputObjectSchema } from './objects/ClaimWhereUniqueInput.schema'
import { ClaimCreateInputObjectSchema } from './objects/ClaimCreateInput.schema'
import { ClaimUncheckedCreateInputObjectSchema } from './objects/ClaimUncheckedCreateInput.schema'
import { ClaimUpdateInputObjectSchema } from './objects/ClaimUpdateInput.schema'
import { ClaimUncheckedUpdateInputObjectSchema } from './objects/ClaimUncheckedUpdateInput.schema'

export const ClaimUpsertSchema = z.object({
	where: ClaimWhereUniqueInputObjectSchema,
	create: z.union([
		ClaimCreateInputObjectSchema,
		ClaimUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		ClaimUpdateInputObjectSchema,
		ClaimUncheckedUpdateInputObjectSchema,
	]),
})
