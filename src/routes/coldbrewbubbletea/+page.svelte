<script lang="ts">
    import { onMount } from 'svelte'
    import { Chart, Layer, Axis, Points, Spline, LineChart } from 'layerchart'
    import { curveMonotoneX } from 'd3-shape'
    import { scaleLog } from 'd3-scale'
    import { Grid, Willow } from 'wx-svelte-grid'

    let chartData: any[] = []
    let loading = true

    // State for multiple datasets
    let additionalDatasets: { [key: string]: { data: any[], loading: boolean, collapsed: boolean, title: string, columns: any[] } } = {}

    // Define the additional endpoints
    const additionalEndpoints = [
        { url: '/api/visualize/data/ft', title: 'Full Training Data', key: 'ft' },
        { url: '/api/visualize/data/60M_pile', title: '60M Pile Validation', key: '60M_pile' }
    ]

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
    function formatModelSize(d: number): string {
        if (d < 1_000_000_000) return `${d / 1_000_000}M`
        return `${d / 1_000_000_000}B`
    }

    async function fetchData() {
        try{
            const response = await fetch('https://api.bytomorrow.app/api/visualize/data')
            const result = await response.json()
            chartData = result.data.sort((a: any, b: any) =>
                parseParameterSize(a.params) - parseParameterSize(b.params)
            )
            chartData = chartData.map(row => ({
                ...row,
                params_numeric: parseParameterSize(row.params)
            }))
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
                data={chartData} x="params_numeric" y="value" 
                props={{ 
                    spline: { curve: curveMonotoneX , class: 'stroke-2'},
                    points: { class: 'fill-primary stroke-primary' },
                    xAxis: { 
                        placement: 'bottom', grid: true, rule: true, label: 'Model Size', labelPlacement: 'end', 
                        format: formatModelSize, 
                    },
                    yAxis: { 
                        placement: 'left', 
                        grid: true, 
                        rule: true , 
                        label: 'Pile Val PPL',
                        labelPlacement: 'top',
                    }
                }}
                yNice
                points
                padding={{ left: 20, bottom: 30, top: 10, right: 10}}
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