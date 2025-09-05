import fs from 'fs/promises';
import path from 'path';
import type { PageServerLoad } from './$types';
import { parsePaperData } from '$lib/arxiv/arxivHtml.svelte';
import { db } from '$lib/database';

// export async function load({ fetch }) {
//     const response = await fetch('https://arxiv.org/html/2403.01874'); // Replace with your URL
//     if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }
//     const paperText await response.text();
//     return { paperText };
// }

// Maybe sample a random paper url = arxiv id?
export const load: PageServerLoad = async () => {
    return {html: ''};
}

export const actions = {
    testFile: async ({ request }) => {
        const filePath = path.resolve('static', 'testPage.html');
        try {
            const htmlStr = await fs.readFile(filePath, 'utf-8');
            let pageDataStr = JSON.stringify(parsePaperData(htmlStr));
            return {success: true, pageDataStr }
        } catch (error) {
            console.error('Error reading the HTML file:', error);
            return {success: false}
        }
    },
    query: async ({ request }) => {
        const formData = await request.formData();
        const url = formData.get('url');

        // Check if the url is already in the db
        const existingPaper = await db.paperData.findUnique({
            where: { arxivId: url },
            select: { paperDataStr: true}
        })
        if (existingPaper) {
            console.log("Found existing paper in the db");
            return { success: true, pageDataStr: existingPaper.paperDataStr }
        }

        // If not, query arxiv
        const htmlUrl = url?.replace('abs', 'html');
        if (!htmlUrl) {
            return {success: false};
        }

        const response = await fetch(htmlUrl); // Replace with your URL
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const paperText = await response.text();
        const pageDataStr = JSON.stringify(parsePaperData(paperText), null, 2);
        console.log("Parsed paper data");


        // Store page Data in the db
        await db.paperData.create({
            data: {
                arxivId: url,
                paperText: paperText,
                paperDataStr: pageDataStr
            }
        });

        console.log("Stored in the db")
        return { success: true, pageDataStr };

        // let pageDataStr = '';
        // try {
        //     pageDataStr = ' '
        // } catch (error) {
        //     console.error('Error reading the HTML file:', error);
        // }
        // return {success: true, pageDataStr }
    },
};