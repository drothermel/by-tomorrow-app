import { z } from 'zod'
import { TopicWhereUniqueInputObjectSchema } from './objects/TopicWhereUniqueInput.schema'

export const TopicFindUniqueSchema = z.object({
	where: TopicWhereUniqueInputObjectSchema,
})
