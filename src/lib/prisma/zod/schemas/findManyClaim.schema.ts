import { z } from 'zod'
import { ClaimOrderByWithRelationInputObjectSchema } from './objects/ClaimOrderByWithRelationInput.schema'
import { ClaimWhereInputObjectSchema } from './objects/ClaimWhereInput.schema'
import { ClaimWhereUniqueInputObjectSchema } from './objects/ClaimWhereUniqueInput.schema'
import { ClaimScalarFieldEnumSchema } from './enums/ClaimScalarFieldEnum.schema'

export const ClaimFindManySchema = z.object({
	orderBy: z
		.union([
			ClaimOrderByWithRelationInputObjectSchema,
			ClaimOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: ClaimWhereInputObjectSchema.optional(),
	cursor: ClaimWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	distinct: z.array(ClaimScalarFieldEnumSchema).optional(),
})
