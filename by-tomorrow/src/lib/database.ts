import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export async function findPaperByArxivId(arxivId: string) {
    try {
      const paper = await db.paperMetadata.findUnique({
        where: { arxivId },
      });
      return paper;
    } catch (error) {
      console.error('Error retrieving paper:', error);
      throw error;
    }
}

export async function addPaperMetadata(input) {
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
        });
        return paper;
    } catch (error) {
        console.error('Error upserting paper metadata:', error);
        throw error;
    }
}

export async function upsertPapersInTransaction(papers) {
    await db.$transaction(async (prisma) => {
      for (const paper of papers) {
        const existingPaper = await prisma.paperMetadata.findUnique({
          where: { arxivId: paper.arxivId },
        });
  
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
          });
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
          });
        }
      }
    });
  }