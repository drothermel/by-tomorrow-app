<script lang="ts">
    import { onMount } from 'svelte'
    import { fetchDataFrame } from '$lib/services/dataService'
    import DataGridComponent from '$lib/components/dataviz/DataGridComponent.svelte'

    let allData: any[] = $state([])
    let filteredData: any[]= $state([])
    let isLoading: boolean = $state(true)

    onMount(async () => {
        try {
            allData = await fetchDataFrame('visualize/data/ft')
            filteredData = allData
        } catch (error) {
            console.error('Error fetching data:', error)
        }
        isLoading = false;
    })
</script>

<div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Finetune + Pretrain Data Table</h1>
    {#if isLoading}
        <p>Loading...</p>
    {:else}
        <div class="border rounded-sm border-gray-800 overflow-auto max-h-[75vh] max-w-[90vw]">
            <div class="overflow-auto">
                <DataGridComponent data={filteredData} />
            </div>
        </div>
    {/if}
</div>
