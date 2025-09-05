import { z } from 'zod'
import { PaperDataOrderByWithRelationInputObjectSchema } from './objects/PaperDataOrderByWithRelationInput.schema'
import { PaperDataWhereInputObjectSchema } from './objects/PaperDataWhereInput.schema'
import { PaperDataWhereUniqueInputObjectSchema } from './objects/PaperDataWhereUniqueInput.schema'
import { PaperDataScalarFieldEnumSchema } from './enums/PaperDataScalarFieldEnum.schema'

export const PaperDataFindFirstSchema = z.object({
	orderBy: z
		.union([
			PaperDataOrderByWithRelationInputObjectSchema,
			PaperDataOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: PaperDataWhereInputObjectSchema.optional(),
	cursor: PaperDataWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	distinct: z.array(PaperDataScalarFieldEnumSchema).optional(),
})
