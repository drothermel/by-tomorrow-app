import { z } from 'zod'
import { PaperDataOrderByWithRelationInputObjectSchema } from './objects/PaperDataOrderByWithRelationInput.schema'
import { PaperDataWhereInputObjectSchema } from './objects/PaperDataWhereInput.schema'
import { PaperDataWhereUniqueInputObjectSchema } from './objects/PaperDataWhereUniqueInput.schema'
import { PaperDataCountAggregateInputObjectSchema } from './objects/PaperDataCountAggregateInput.schema'
import { PaperDataMinAggregateInputObjectSchema } from './objects/PaperDataMinAggregateInput.schema'
import { PaperDataMaxAggregateInputObjectSchema } from './objects/PaperDataMaxAggregateInput.schema'
import { PaperDataAvgAggregateInputObjectSchema } from './objects/PaperDataAvgAggregateInput.schema'
import { PaperDataSumAggregateInputObjectSchema } from './objects/PaperDataSumAggregateInput.schema'

export const PaperDataAggregateSchema = z.object({
	orderBy: z
		.union([
			PaperDataOrderByWithRelationInputObjectSchema,
			PaperDataOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: PaperDataWhereInputObjectSchema.optional(),
	cursor: PaperDataWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	_count: z
		.union([z.literal(true), PaperDataCountAggregateInputObjectSchema])
		.optional(),
	_min: PaperDataMinAggregateInputObjectSchema.optional(),
	_max: PaperDataMaxAggregateInputObjectSchema.optional(),
	_avg: PaperDataAvgAggregateInputObjectSchema.optional(),
	_sum: PaperDataSumAggregateInputObjectSchema.optional(),
})
