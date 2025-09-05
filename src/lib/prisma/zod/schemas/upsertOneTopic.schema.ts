import { z } from 'zod'
import { TopicWhereUniqueInputObjectSchema } from './objects/TopicWhereUniqueInput.schema'
import { TopicCreateInputObjectSchema } from './objects/TopicCreateInput.schema'
import { TopicUncheckedCreateInputObjectSchema } from './objects/TopicUncheckedCreateInput.schema'
import { TopicUpdateInputObjectSchema } from './objects/TopicUpdateInput.schema'
import { TopicUncheckedUpdateInputObjectSchema } from './objects/TopicUncheckedUpdateInput.schema'

export const TopicUpsertSchema = z.object({
	where: TopicWhereUniqueInputObjectSchema,
	create: z.union([
		TopicCreateInputObjectSchema,
		TopicUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		TopicUpdateInputObjectSchema,
		TopicUncheckedUpdateInputObjectSchema,
	]),
})
