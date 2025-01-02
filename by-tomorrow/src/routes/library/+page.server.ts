import { db } from '$lib/database';

export const load = async () => {
    // Fetch all arxivId values from the database
    const papers = await db.paperMetadataLibrary.findMany();
  
    // Return the arxivIds to be available in the page's data
    return { papers };
};


export const actions = {
    removeFromLibrary: async ({ request }) => {
        try {
            // Parse and validate form data
            const formData = await request.formData();
            const toRemove = formData.get('selected');
            if (toRemove) {
                const arxivIds = JSON.parse(toRemove as string) as string[];
                console.log("To Remove:", toRemove)

                if (Array.isArray(arxivIds) && arxivIds.length > 0) {
                
                    const result = await db.paperMetadataLibrary.deleteMany({
                        where: {
                            arxivId: {
                            in: arxivIds,
                            },
                        },
                    });
                    console.log(`Deleted ${result.count} records.`);
                    return {success: true};
                }
            } else {
                console.log("No toRemove:", toRemove)
            }
        } catch (error) {
            return { success: false, error: 'Something went wrong' };
        }
    },
};