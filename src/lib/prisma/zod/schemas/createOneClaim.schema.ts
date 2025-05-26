import { z } from 'zod'
import { ClaimCreateInputObjectSchema } from './objects/ClaimCreateInput.schema'
import { ClaimUncheckedCreateInputObjectSchema } from './objects/ClaimUncheckedCreateInput.schema'

export const ClaimCreateOneSchema = z.object({
	data: z.union([
		ClaimCreateInputObjectSchema,
		ClaimUncheckedCreateInputObjectSchema,
	]),
})
