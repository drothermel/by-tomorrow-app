import { z } from 'zod'
import { TopicWhereUniqueInputObjectSchema } from './objects/TopicWhereUniqueInput.schema'

export const TopicDeleteOneSchema = z.object({
	where: TopicWhereUniqueInputObjectSchema,
})
