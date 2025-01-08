import fs from 'fs/promises';
import path from 'path';
import type { PageServerLoad } from './$types';

// export async function load({ fetch }) {
//     const response = await fetch('https://arxiv.org/html/2403.01874'); // Replace with your URL
//     if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }
//     const paperText await response.text();
//     return { paperText };
// }

export const load: PageServerLoad = async () => {
    const filePath = path.resolve('static', 'testPage.html');
    try {
        const html = await fs.readFile(filePath, 'utf-8');
        return { html };
    } catch (error) {
        console.error('Error reading the HTML file:', error);
    }
}