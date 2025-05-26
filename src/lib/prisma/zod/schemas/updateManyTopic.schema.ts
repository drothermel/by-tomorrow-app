import { z } from 'zod'
import { TopicUpdateManyMutationInputObjectSchema } from './objects/TopicUpdateManyMutationInput.schema'
import { TopicWhereInputObjectSchema } from './objects/TopicWhereInput.schema'

export const TopicUpdateManySchema = z.object({
	data: TopicUpdateManyMutationInputObjectSchema,
	where: TopicWhereInputObjectSchema.optional(),
})
