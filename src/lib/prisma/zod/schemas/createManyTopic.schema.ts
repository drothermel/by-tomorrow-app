import { z } from 'zod'
import { TopicCreateManyInputObjectSchema } from './objects/TopicCreateManyInput.schema'

export const TopicCreateManySchema = z.object({
	data: z.union([
		TopicCreateManyInputObjectSchema,
		z.array(TopicCreateManyInputObjectSchema),
	]),
	skipDuplicates: z.boolean().optional(),
})
