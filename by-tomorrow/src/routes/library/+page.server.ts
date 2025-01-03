import { db } from '$lib/database';
import type { PaperMetadata } from '@prisma/client';

export const load = async () => {
    // Fetch all arxivId values from the database
    const papers: PaperMetadata[] = await db.paperMetadata.findMany();
  
    // Return the arxivIds to be available in the page's data
    return { papers };
};