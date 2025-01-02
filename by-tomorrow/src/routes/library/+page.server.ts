import { db } from '$lib/database';

export const load = async () => {
    // Fetch all arxivId values from the database
    const papers = await db.paperMetadataLibrary.findMany();
  
    // Return the arxivIds to be available in the page's data
    return { papers };
};
