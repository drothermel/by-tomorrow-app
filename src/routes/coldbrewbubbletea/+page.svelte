<script lang="ts">
    import { onMount } from 'svelte'
    import { LineChart } from 'layerchart'
    let chartData: any[] = []
    let loading = true

    async function fetchData() {
        try{
            const response = await fetch('https://api.bytomorrow.app/api/visualize/data')
            const result = await response.json()
            chartData = result.data
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            loading = false
        }
    }

    onMount(fetchData)
</script>

<div class="p-8">
    <h1 class="text-2xl font-bold mb-6">ML Scaling Analysis</h1>
    {#if loading}
        <p>Loading viz...</p>
    {:else if chartData.length > 0}
        <div class="h-96 p-4 border rounded-sm">
            <LineChart data={chartData} x="params" y="pile-valppl" />
        </div>
    {:else}
    <p>No data available</p>
    {/if}
</div>