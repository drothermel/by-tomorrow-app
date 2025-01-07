
export async function load({ fetch }) {
    const response = await fetch('https://arxiv.org/html/2403.01874'); // Replace with your URL
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const paperText = await response.text();
    return { paperText };
}