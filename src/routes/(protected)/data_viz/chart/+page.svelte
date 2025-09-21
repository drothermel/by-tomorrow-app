<script lang="ts">
    import { onMount } from 'svelte'
    import { fetchDataFrame } from '$lib/services/dataService'
    import DataGridComponent from '$lib/components/dataviz/DataGridComponent.svelte'
    import LineChartComponent from '$lib/components/dataviz/LineChartComponent.svelte'

    let allData: any[] = $state([])
    let filteredData: any[]= $state([])
    let isLoading: boolean = $state(true)
    let filters: any[] = $state([])

    onMount(async () => {
        try {
            allData = await fetchDataFrame('visualize/data/small')
            filteredData = allData
        } catch (error) {
            console.error('Error fetching data:', error)
        }
        isLoading = false;
    })

    function applyFilters(newFilters: any[]) {
        filters = newFilters
        filteredData = allData.filter((row) => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true
                return String(row[key]).toLowerCase().includes(
                    String(value).toLowerCase()
                )
            })
        })
    }

    function handleGridFilter(event: any) {
        applyFilters(event.detail.filters)
    }
</script>

<div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Data Viz</h1>
    {#if isLoading}
        <p>Loading...</p>
    {:else}
        <LineChartComponent data={filteredData} loading={isLoading} />
    {/if}
</div>