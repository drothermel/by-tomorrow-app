import { z } from 'zod'
import { PaperDataWhereInputObjectSchema } from './objects/PaperDataWhereInput.schema'
import { PaperDataOrderByWithAggregationInputObjectSchema } from './objects/PaperDataOrderByWithAggregationInput.schema'
import { PaperDataScalarWhereWithAggregatesInputObjectSchema } from './objects/PaperDataScalarWhereWithAggregatesInput.schema'
import { PaperDataScalarFieldEnumSchema } from './enums/PaperDataScalarFieldEnum.schema'

export const PaperDataGroupBySchema = z.object({
	where: PaperDataWhereInputObjectSchema.optional(),
	orderBy: z
		.union([
			PaperDataOrderByWithAggregationInputObjectSchema,
			PaperDataOrderByWithAggregationInputObjectSchema.array(),
		])
		.optional(),
	having: PaperDataScalarWhereWithAggregatesInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	by: z.array(PaperDataScalarFieldEnumSchema),
})
