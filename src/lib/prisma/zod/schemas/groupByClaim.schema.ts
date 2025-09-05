import { z } from 'zod'
import { ClaimWhereInputObjectSchema } from './objects/ClaimWhereInput.schema'
import { ClaimOrderByWithAggregationInputObjectSchema } from './objects/ClaimOrderByWithAggregationInput.schema'
import { ClaimScalarWhereWithAggregatesInputObjectSchema } from './objects/ClaimScalarWhereWithAggregatesInput.schema'
import { ClaimScalarFieldEnumSchema } from './enums/ClaimScalarFieldEnum.schema'

export const ClaimGroupBySchema = z.object({
	where: ClaimWhereInputObjectSchema.optional(),
	orderBy: z
		.union([
			ClaimOrderByWithAggregationInputObjectSchema,
			ClaimOrderByWithAggregationInputObjectSchema.array(),
		])
		.optional(),
	having: ClaimScalarWhereWithAggregatesInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	by: z.array(ClaimScalarFieldEnumSchema),
})
