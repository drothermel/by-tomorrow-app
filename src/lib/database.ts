import { PrismaClient, type Prisma, type PaperMetadata } from '@prisma/client'
import { dev } from '$app/environment'
import logger from '$lib/logger'

let prisma: PrismaClient
if (dev) {
	// Avoid creating new instances during hot reload when in dev mode
	const globalWithPrisma = globalThis as typeof globalThis & {
		prisma?: PrismaClient
	}
	prisma = globalWithPrisma.prisma || new PrismaClient()
	globalWithPrisma.prisma = prisma
} else {
	prisma = new PrismaClient()
}

/** Prisma client instance used across the application. */
export const db = prisma

/** Input type used when upserting paper metadata. */
export type PaperMetadataInput = {
	arxivId: string
	published: Date
	updated: Date
	title: string
	abstract: string
	authors: string
	absLink: string
	pdfLink: string
	categories: string
	primaryCategory: string
	comments?: string
	tags?: string
}

/**
 * Retrieve a paper by arXiv identifier.
 */
export async function findPaperByArxivId(arxivId: string) {
	try {
		const paper = await db.paperMetadata.findUnique({
			where: { arxivId },
		})
		return paper
	} catch (error) {
		console.error('Error retrieving paper:', error)
		throw error
	}
}

/**
 * Insert or update a single paper metadata record.
 */
export async function addPaperMetadata(input: PaperMetadataInput) {
	try {
		const paper = await db.paperMetadata.upsert({
			where: { arxivId: input.arxivId },
			update: {
				published: input.published,
				updated: input.updated,
				title: input.title,
				abstract: input.abstract,
				authors: input.authors,
				absLink: input.absLink,
				pdfLink: input.pdfLink,
				categories: input.categories,
				primaryCategory: input.primaryCategory,
				comments: input.comments,
				tags: input.tags,
			},
			create: {
				arxivId: input.arxivId,
				published: input.published,
				updated: input.updated,
				title: input.title,
				abstract: input.abstract,
				authors: input.authors,
				absLink: input.absLink,
				pdfLink: input.pdfLink,
				categories: input.categories,
				primaryCategory: input.primaryCategory,
				comments: input.comments,
				tags: input.tags,
			},
		})
		return paper
	} catch (error) {
		console.error('Error upserting paper metadata:', error)
		throw error
	}
}

/**
 * Upsert multiple papers within a single transaction. Existing records are
 * updated and new ones are created.
 */
export async function upsertPapersInTransaction(
        papers: PaperMetadataInput[]
): Promise<void> {
        await db.$transaction(async (prisma: Prisma.TransactionClient) => {
                for (const paper of papers) {
			const existingPaper = await prisma.paperMetadata.findUnique({
				where: { arxivId: paper.arxivId },
			})

			if (existingPaper) {
				await prisma.paperMetadata.update({
					where: { arxivId: paper.arxivId },
					data: {
						published: new Date(paper.published),
						updated: new Date(paper.updated),
						title: paper.title,
						abstract: paper.abstract,
						authors: paper.authors,
						absLink: paper.absLink,
						pdfLink: paper.pdfLink,
						categories: paper.categories,
						primaryCategory: paper.primaryCategory,
						comments: paper.comments,
						tags: paper.tags,
					},
				})
			} else {
				await prisma.paperMetadata.create({
					data: {
						arxivId: paper.arxivId,
						published: new Date(paper.published),
						updated: new Date(paper.updated),
						title: paper.title,
						abstract: paper.abstract,
						authors: paper.authors,
						absLink: paper.absLink,
						pdfLink: paper.pdfLink,
						categories: paper.categories,
						primaryCategory: paper.primaryCategory,
						comments: paper.comments,
						tags: paper.tags,
                                        },
                                })
                        }
                }
        })
}

/**
 * Merge and insert an array of PaperMetadata records.
 */
export async function mergeInsertData(
        data: PaperMetadata[]
): Promise<{ success: boolean; error?: string }> {
        try {
                const inputs: PaperMetadataInput[] = data.map((p) => ({
                        arxivId: p.arxivId,
                        published: p.published,
                        updated: p.updated,
                        title: p.title,
                        abstract: p.abstract,
                        authors: p.authors,
                        absLink: p.absLink,
                        pdfLink: p.pdfLink,
                        categories: p.categories,
                        primaryCategory: p.primaryCategory,
                        comments: p.comments ?? undefined,
                        tags: p.tags ?? undefined,
                }))
                await upsertPapersInTransaction(inputs)
                return { success: true }
        } catch (error) {
                logger.error('Error merging insert data:', error)
                return { success: false, error: (error as Error).message }
        }
}
