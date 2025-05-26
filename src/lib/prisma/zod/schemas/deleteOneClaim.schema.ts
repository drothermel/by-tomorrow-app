import { z } from 'zod'
import { ClaimWhereUniqueInputObjectSchema } from './objects/ClaimWhereUniqueInput.schema'

export const ClaimDeleteOneSchema = z.object({
	where: ClaimWhereUniqueInputObjectSchema,
})
