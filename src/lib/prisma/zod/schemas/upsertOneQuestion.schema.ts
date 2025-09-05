import { z } from 'zod'
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema'
import { QuestionCreateInputObjectSchema } from './objects/QuestionCreateInput.schema'
import { QuestionUncheckedCreateInputObjectSchema } from './objects/QuestionUncheckedCreateInput.schema'
import { QuestionUpdateInputObjectSchema } from './objects/QuestionUpdateInput.schema'
import { QuestionUncheckedUpdateInputObjectSchema } from './objects/QuestionUncheckedUpdateInput.schema'

export const QuestionUpsertSchema = z.object({
	where: QuestionWhereUniqueInputObjectSchema,
	create: z.union([
		QuestionCreateInputObjectSchema,
		QuestionUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		QuestionUpdateInputObjectSchema,
		QuestionUncheckedUpdateInputObjectSchema,
	]),
})
