import { z } from 'zod'
import { PaperMetadataOrderByWithRelationInputObjectSchema } from './objects/PaperMetadataOrderByWithRelationInput.schema'
import { PaperMetadataWhereInputObjectSchema } from './objects/PaperMetadataWhereInput.schema'
import { PaperMetadataWhereUniqueInputObjectSchema } from './objects/PaperMetadataWhereUniqueInput.schema'
import { PaperMetadataScalarFieldEnumSchema } from './enums/PaperMetadataScalarFieldEnum.schema'

export const PaperMetadataFindFirstSchema = z.object({
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
	distinct: z.array(PaperMetadataScalarFieldEnumSchema).optional(),
})
