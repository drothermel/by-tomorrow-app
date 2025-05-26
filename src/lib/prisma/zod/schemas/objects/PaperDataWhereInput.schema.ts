import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PaperDataWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => PaperDataWhereInputObjectSchema),
				z.lazy(() => PaperDataWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => PaperDataWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PaperDataWhereInputObjectSchema),
				z.lazy(() => PaperDataWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
		arxivId: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		paperText: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		paperDataStr: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		created_at: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		updated_at: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
	})
	.strict()

export const PaperDataWhereInputObjectSchema = Schema
