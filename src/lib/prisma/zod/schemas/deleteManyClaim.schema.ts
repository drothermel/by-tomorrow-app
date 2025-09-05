import { z } from 'zod'
import { ClaimWhereInputObjectSchema } from './objects/ClaimWhereInput.schema'

export const ClaimDeleteManySchema = z.object({
	where: ClaimWhereInputObjectSchema.optional(),
})
