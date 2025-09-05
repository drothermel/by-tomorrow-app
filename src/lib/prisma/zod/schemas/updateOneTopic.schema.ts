import { z } from 'zod'
import { TopicUpdateInputObjectSchema } from './objects/TopicUpdateInput.schema'
import { TopicUncheckedUpdateInputObjectSchema } from './objects/TopicUncheckedUpdateInput.schema'
import { TopicWhereUniqueInputObjectSchema } from './objects/TopicWhereUniqueInput.schema'

export const TopicUpdateOneSchema = z.object({
	data: z.union([
		TopicUpdateInputObjectSchema,
		TopicUncheckedUpdateInputObjectSchema,
	]),
	where: TopicWhereUniqueInputObjectSchema,
})
