import { z } from 'zod'
import { PaperMetadataWhereInputObjectSchema } from './objects/PaperMetadataWhereInput.schema'
import { PaperMetadataOrderByWithAggregationInputObjectSchema } from './objects/PaperMetadataOrderByWithAggregationInput.schema'
import { PaperMetadataScalarWhereWithAggregatesInputObjectSchema } from './objects/PaperMetadataScalarWhereWithAggregatesInput.schema'
import { PaperMetadataScalarFieldEnumSchema } from './enums/PaperMetadataScalarFieldEnum.schema'

export const PaperMetadataGroupBySchema = z.object({
	where: PaperMetadataWhereInputObjectSchema.optional(),
	orderBy: z
		.union([
			PaperMetadataOrderByWithAggregationInputObjectSchema,
			PaperMetadataOrderByWithAggregationInputObjectSchema.array(),
		])
		.optional(),
	having: PaperMetadataScalarWhereWithAggregatesInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	by: z.array(PaperMetadataScalarFieldEnumSchema),
})
