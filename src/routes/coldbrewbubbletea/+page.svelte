<script lang="ts">
    import { onMount } from 'svelte'
    import { Chart, Layer, Axis, Points, Spline, LineChart } from 'layerchart'
    import { curveMonotoneX } from 'd3-shape'
    import { Grid, Willow } from 'wx-svelte-grid'

    let chartData: any[] = []
    let loading = true

    const columns = [
        {
            id: "params",
            header: [
                { text: "Model Information", colspan: 2, collapsible: true, collapsed: false },
                { text: "Parameters" }
            ],
            width: 150,
            sort: true
        },
        {
            id: "value",
            header: [
                { text: "" },
                { text: "Pile Val PPL" }
            ],
            width: 150,
            sort: true
        }
    ]

    function parseParameterSize(paramStr: string): number {
        const match = paramStr.match(/^(\d+(?:\.\d+)?)(M|B|K|T)?$/i)
        if (!match) return 0

        const [, numStr, suffix] = match
        const num = parseFloat(numStr)

        switch (suffix?.toUpperCase()) {
            case 'K': return num * 1_000
            case 'M': return num * 1_000_000
            case 'B': return num * 1_000_000_000
            case 'T': return num * 1_000_000_000_000
            default: return num
        }
    }

    async function fetchData() {
        try{
            const response = await fetch('https://api.bytomorrow.app/api/visualize/data')
            const result = await response.json()
            chartData = result.data.sort((a: any, b: any) =>
                parseParameterSize(a.params) - parseParameterSize(b.params)
            )
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
        <div class="h-96 md:h-80 w-full p-4 border rounded-sm">
            <LineChart 
                data={chartData} x="params" y="value" 
                props={{ 
                    spline: { curve: curveMonotoneX , class: 'stroke-2'},
                    points: { class: 'fill-primary stroke-primary' },
                    xAxis: { placement: 'bottom', grid: true, rule: true, label: 'Model Size', labelPlacement: 'end'},
                    yAxis: { placement: 'left', grid: true, rule: true , label: 'Pile Val PPL', labelPlacement: 'top'}
                }}
                yNice
                points
            >
            </LineChart>
        </div>

        <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4">Data Table</h2>
            <div class="border rounded-sm">
                <Willow>
                    <Grid data={chartData} {columns} />
                </Willow>
            </div>
        </div>
    {:else}
    <p>No data available</p>
    {/if}
</div>