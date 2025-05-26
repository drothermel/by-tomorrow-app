import { z } from 'zod'
import { TopicOrderByWithRelationInputObjectSchema } from './objects/TopicOrderByWithRelationInput.schema'
import { TopicWhereInputObjectSchema } from './objects/TopicWhereInput.schema'
import { TopicWhereUniqueInputObjectSchema } from './objects/TopicWhereUniqueInput.schema'
import { TopicScalarFieldEnumSchema } from './enums/TopicScalarFieldEnum.schema'

export const TopicFindManySchema = z.object({
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
	distinct: z.array(TopicScalarFieldEnumSchema).optional(),
})
