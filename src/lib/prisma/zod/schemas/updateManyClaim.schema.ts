import { z } from 'zod'
import { ClaimUpdateManyMutationInputObjectSchema } from './objects/ClaimUpdateManyMutationInput.schema'
import { ClaimWhereInputObjectSchema } from './objects/ClaimWhereInput.schema'

export const ClaimUpdateManySchema = z.object({
	data: ClaimUpdateManyMutationInputObjectSchema,
	where: ClaimWhereInputObjectSchema.optional(),
})
