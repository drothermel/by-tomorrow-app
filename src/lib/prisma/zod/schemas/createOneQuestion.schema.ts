import { z } from 'zod'
import { QuestionCreateInputObjectSchema } from './objects/QuestionCreateInput.schema'
import { QuestionUncheckedCreateInputObjectSchema } from './objects/QuestionUncheckedCreateInput.schema'

export const QuestionCreateOneSchema = z.object({
	data: z.union([
		QuestionCreateInputObjectSchema,
		QuestionUncheckedCreateInputObjectSchema,
	]),
})
