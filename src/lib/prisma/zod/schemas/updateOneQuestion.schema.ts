import { z } from 'zod'
import { QuestionUpdateInputObjectSchema } from './objects/QuestionUpdateInput.schema'
import { QuestionUncheckedUpdateInputObjectSchema } from './objects/QuestionUncheckedUpdateInput.schema'
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema'

export const QuestionUpdateOneSchema = z.object({
	data: z.union([
		QuestionUpdateInputObjectSchema,
		QuestionUncheckedUpdateInputObjectSchema,
	]),
	where: QuestionWhereUniqueInputObjectSchema,
})
