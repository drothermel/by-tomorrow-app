export async function fetchDataFrame(endpoint: string) {
    const response = await fetch(`https://api.bytomorrow.app/api/${endpoint}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`)
    }
    const data = await response.json()
    return data.data
}