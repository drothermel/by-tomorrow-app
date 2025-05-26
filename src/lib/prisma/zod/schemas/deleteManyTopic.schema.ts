import { z } from 'zod'
import { TopicWhereInputObjectSchema } from './objects/TopicWhereInput.schema'

export const TopicDeleteManySchema = z.object({
	where: TopicWhereInputObjectSchema.optional(),
})
