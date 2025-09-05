import { z } from 'zod'
import { QuestionOrderByWithRelationInputObjectSchema } from './objects/QuestionOrderByWithRelationInput.schema'
import { QuestionWhereInputObjectSchema } from './objects/QuestionWhereInput.schema'
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema'
import { QuestionScalarFieldEnumSchema } from './enums/QuestionScalarFieldEnum.schema'

export const QuestionFindFirstSchema = z.object({
	orderBy: z
		.union([
			QuestionOrderByWithRelationInputObjectSchema,
			QuestionOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: QuestionWhereInputObjectSchema.optional(),
	cursor: QuestionWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	distinct: z.array(QuestionScalarFieldEnumSchema).optional(),
})
