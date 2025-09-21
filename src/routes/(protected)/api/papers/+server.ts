import { json } from '@sveltejs/kit'
import { db, mergeInsertData } from '$lib/database'
import {
	paperApiBulkAddDataSchema,
	paperApiRemoveDataSchema,
	paperApiSearchParamsSchema,
} from '$lib/schemas.js'
import type { PaperMetadata } from '@prisma/client'

// Convert URLSearchParams into an object suitable for Zod parsing
const parseSearchParams = (params: URLSearchParams) => {
	const result: Record<string, any> = {}
	for (const [key, value] of params.entries()) {
		result[key] = value === '' ? true : value // Interpret keys without values as `true`
	}
	return result
}

export async function GET({ url }) {
	const searchParams = parseSearchParams(url.searchParams)
	const params = paperApiSearchParamsSchema.safeParse(searchParams)
	if (!params.success) {
		return json(
			{
				success: false,
				error: 'Invalid query parameters',
				errors: params.error.errors,
			},
			{ status: 400 }
		)
	}

	if (params.data.metadata) {
		if (params.data.arxivID) {
			let queryId = params.data.arxivID
			const paperMetadata = await db.paperMetadata.findUnique({
				where: {
					arxivId: queryId,
				},
			})
			if (paperMetadata) {
				return json({
					success: true,
					queryArxivId: queryId,
					metadata: paperMetadata,
				})
			}
			return json(
				{ success: false, error: 'Paper not found', queryArxivId: queryId },
				{ status: 404 }
			)
		}
		const allMetadata = await db.paperMetadata.findMany()
		return json({ success: true, allMetadata: allMetadata })
	}
	return json(
		{ success: false, error: 'Full papers not available now' },
		{ status: 404 }
	)
}

export async function POST({ request }) {
	const { action, data } = await request.json()
	switch (action) {
		case 'addPaperMetadata':
			return await addPaperMetadata(data)
		case 'removePaperMetadata':
			return await removePaperMetadata(data)
		default:
			return json(
				{ success: false, error: 'Invalid action', action },
				{ status: 400 }
			)
	}
}

async function addPaperMetadata(data: unknown) {
	// Validate data
	const validatedData = paperApiBulkAddDataSchema.safeParse(data)
	if (!validatedData.success) {
		return json(
			{
				success: false,
				error: 'Invalid data',
				errors: validatedData.error.errors,
			},
			{ status: 400 }
		)
	}
	const dataToInsert = validatedData.data as unknown as PaperMetadata[]
	const result = await mergeInsertData(dataToInsert)
	if (!result.success) {
		return json({ success: false, error: result.error })
	}
	return json({ success: true })
}

async function removePaperMetadata(data: unknown) {
	const uniqueValData = paperApiRemoveDataSchema.safeParse(data)
	if (!uniqueValData.success) {
		return json(
			{
				success: false,
				error: 'Invalid data',
				errors: uniqueValData.error.errors,
			},
			{ status: 400 }
		)
	}
	const uniqueIds = uniqueValData.data.arxivIDs
	try {
		const result = await db.paperMetadata.deleteMany({
			where: { arxivId: { in: uniqueIds } },
		})
		if (!result || result.count != uniqueIds.length) {
			return json({
				success: false,
				error: `Failed to delete some records, deleted ${result.count} out of ${uniqueIds.length}.`,
			})
		}
	} catch (error) {
		console.error(error)
		return json(
			{
				success: false,
				error: 'Failed to delete records',
				errors: (error as Error).message,
			},
			{ status: 500 }
		)
	}
	return json({ success: true })
}
