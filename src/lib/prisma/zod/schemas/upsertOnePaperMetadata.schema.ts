import { z } from 'zod'
import { PaperMetadataWhereUniqueInputObjectSchema } from './objects/PaperMetadataWhereUniqueInput.schema'
import { PaperMetadataCreateInputObjectSchema } from './objects/PaperMetadataCreateInput.schema'
import { PaperMetadataUncheckedCreateInputObjectSchema } from './objects/PaperMetadataUncheckedCreateInput.schema'
import { PaperMetadataUpdateInputObjectSchema } from './objects/PaperMetadataUpdateInput.schema'
import { PaperMetadataUncheckedUpdateInputObjectSchema } from './objects/PaperMetadataUncheckedUpdateInput.schema'

export const PaperMetadataUpsertSchema = z.object({
	where: PaperMetadataWhereUniqueInputObjectSchema,
	create: z.union([
		PaperMetadataCreateInputObjectSchema,
		PaperMetadataUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		PaperMetadataUpdateInputObjectSchema,
		PaperMetadataUncheckedUpdateInputObjectSchema,
	]),
})
