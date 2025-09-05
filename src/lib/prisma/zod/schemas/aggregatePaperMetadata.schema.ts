import { z } from 'zod'
import { PaperMetadataOrderByWithRelationInputObjectSchema } from './objects/PaperMetadataOrderByWithRelationInput.schema'
import { PaperMetadataWhereInputObjectSchema } from './objects/PaperMetadataWhereInput.schema'
import { PaperMetadataWhereUniqueInputObjectSchema } from './objects/PaperMetadataWhereUniqueInput.schema'
import { PaperMetadataCountAggregateInputObjectSchema } from './objects/PaperMetadataCountAggregateInput.schema'
import { PaperMetadataMinAggregateInputObjectSchema } from './objects/PaperMetadataMinAggregateInput.schema'
import { PaperMetadataMaxAggregateInputObjectSchema } from './objects/PaperMetadataMaxAggregateInput.schema'
import { PaperMetadataAvgAggregateInputObjectSchema } from './objects/PaperMetadataAvgAggregateInput.schema'
import { PaperMetadataSumAggregateInputObjectSchema } from './objects/PaperMetadataSumAggregateInput.schema'

export const PaperMetadataAggregateSchema = z.object({
	orderBy: z
		.union([
			PaperMetadataOrderByWithRelationInputObjectSchema,
			PaperMetadataOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: PaperMetadataWhereInputObjectSchema.optional(),
	cursor: PaperMetadataWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	_count: z
		.union([z.literal(true), PaperMetadataCountAggregateInputObjectSchema])
		.optional(),
	_min: PaperMetadataMinAggregateInputObjectSchema.optional(),
	_max: PaperMetadataMaxAggregateInputObjectSchema.optional(),
	_avg: PaperMetadataAvgAggregateInputObjectSchema.optional(),
	_sum: PaperMetadataSumAggregateInputObjectSchema.optional(),
})
