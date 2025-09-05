import { z } from 'zod'
import { TopicOrderByWithRelationInputObjectSchema } from './objects/TopicOrderByWithRelationInput.schema'
import { TopicWhereInputObjectSchema } from './objects/TopicWhereInput.schema'
import { TopicWhereUniqueInputObjectSchema } from './objects/TopicWhereUniqueInput.schema'
import { TopicCountAggregateInputObjectSchema } from './objects/TopicCountAggregateInput.schema'
import { TopicMinAggregateInputObjectSchema } from './objects/TopicMinAggregateInput.schema'
import { TopicMaxAggregateInputObjectSchema } from './objects/TopicMaxAggregateInput.schema'
import { TopicAvgAggregateInputObjectSchema } from './objects/TopicAvgAggregateInput.schema'
import { TopicSumAggregateInputObjectSchema } from './objects/TopicSumAggregateInput.schema'

export const TopicAggregateSchema = z.object({
	orderBy: z
		.union([
			TopicOrderByWithRelationInputObjectSchema,
			TopicOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: TopicWhereInputObjectSchema.optional(),
	cursor: TopicWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	_count: z
		.union([z.literal(true), TopicCountAggregateInputObjectSchema])
		.optional(),
	_min: TopicMinAggregateInputObjectSchema.optional(),
	_max: TopicMaxAggregateInputObjectSchema.optional(),
	_avg: TopicAvgAggregateInputObjectSchema.optional(),
	_sum: TopicSumAggregateInputObjectSchema.optional(),
})
