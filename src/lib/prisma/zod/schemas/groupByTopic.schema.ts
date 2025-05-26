import { z } from 'zod'
import { TopicWhereInputObjectSchema } from './objects/TopicWhereInput.schema'
import { TopicOrderByWithAggregationInputObjectSchema } from './objects/TopicOrderByWithAggregationInput.schema'
import { TopicScalarWhereWithAggregatesInputObjectSchema } from './objects/TopicScalarWhereWithAggregatesInput.schema'
import { TopicScalarFieldEnumSchema } from './enums/TopicScalarFieldEnum.schema'

export const TopicGroupBySchema = z.object({
	where: TopicWhereInputObjectSchema.optional(),
	orderBy: z
		.union([
			TopicOrderByWithAggregationInputObjectSchema,
			TopicOrderByWithAggregationInputObjectSchema.array(),
		])
		.optional(),
	having: TopicScalarWhereWithAggregatesInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	by: z.array(TopicScalarFieldEnumSchema),
})
