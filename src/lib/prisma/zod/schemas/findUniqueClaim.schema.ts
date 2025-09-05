import { z } from 'zod'
import { ClaimWhereUniqueInputObjectSchema } from './objects/ClaimWhereUniqueInput.schema'

export const ClaimFindUniqueSchema = z.object({
	where: ClaimWhereUniqueInputObjectSchema,
})
