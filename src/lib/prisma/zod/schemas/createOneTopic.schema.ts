import { z } from 'zod'
import { TopicCreateInputObjectSchema } from './objects/TopicCreateInput.schema'
import { TopicUncheckedCreateInputObjectSchema } from './objects/TopicUncheckedCreateInput.schema'

export const TopicCreateOneSchema = z.object({
	data: z.union([
		TopicCreateInputObjectSchema,
		TopicUncheckedCreateInputObjectSchema,
	]),
})
