import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export type PaperMetadataInput = {
    arxivId: string;
    published: Date;
    updated: Date;
    title: string;
    abstract: string;
    authors: string;
    absLink: string;
    pdfLink: string;
    categories: string;
    primaryCategory: string;
    comments?: string;
}

export async function findPaperByArxivId(arxivId: string) {
    try {
      const paper = await db.paperMetadataLibrary.findUnique({
        where: { arxivId },
      });
      return paper;
    } catch (error) {
      console.error('Error retrieving paper:', error);
      throw error;
    }
}

export async function addPaperMetadata(input: PaperMetadataInput) {
    try {
        const paper = await db.paperMetadataLibrary.upsert({
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
            },
        });
        return paper;
    } catch (error) {
        console.error('Error upserting paper metadata:', error);
        throw error;
    }
}

export async function upsertPapersInTransaction(papers: PaperMetadataInput[]) {
    await db.$transaction(async (prisma) => {
      for (const paper of papers) {
        const existingPaper = await prisma.paperMetadataLibrary.findUnique({
          where: { arxivId: paper.arxivId },
        });
  
        if (existingPaper) {
          await prisma.paperMetadataLibrary.update({
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
            },
          });
        } else {
          await prisma.paperMetadataLibrary.create({
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
            },
          });
        }
      }
    });
  }