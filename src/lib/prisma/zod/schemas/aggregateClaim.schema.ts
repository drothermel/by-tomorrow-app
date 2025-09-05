import { z } from 'zod'
import { ClaimOrderByWithRelationInputObjectSchema } from './objects/ClaimOrderByWithRelationInput.schema'
import { ClaimWhereInputObjectSchema } from './objects/ClaimWhereInput.schema'
import { ClaimWhereUniqueInputObjectSchema } from './objects/ClaimWhereUniqueInput.schema'
import { ClaimCountAggregateInputObjectSchema } from './objects/ClaimCountAggregateInput.schema'
import { ClaimMinAggregateInputObjectSchema } from './objects/ClaimMinAggregateInput.schema'
import { ClaimMaxAggregateInputObjectSchema } from './objects/ClaimMaxAggregateInput.schema'
import { ClaimAvgAggregateInputObjectSchema } from './objects/ClaimAvgAggregateInput.schema'
import { ClaimSumAggregateInputObjectSchema } from './objects/ClaimSumAggregateInput.schema'

export const ClaimAggregateSchema = z.object({
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
	_count: z
		.union([z.literal(true), ClaimCountAggregateInputObjectSchema])
		.optional(),
	_min: ClaimMinAggregateInputObjectSchema.optional(),
	_max: ClaimMaxAggregateInputObjectSchema.optional(),
	_avg: ClaimAvgAggregateInputObjectSchema.optional(),
	_sum: ClaimSumAggregateInputObjectSchema.optional(),
})
