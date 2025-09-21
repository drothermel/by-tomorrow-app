<script lang="ts">
    import { LineChart } from 'layerchart'
    import { curveMonotoneX } from 'd3-shape'
    

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

    function sortedData(data: any[]) {
        return data.toSorted((a: any, b: any) => parseParameterSize(a.params) - parseParameterSize(b.params))
    }

    let { data, loading} = $props()
    let chartData = $derived(
        Array.isArray(data) ? sortedData(data).map((row: any, index: number) => ({
            ...row,
            id: index,
            params_numeric: parseParameterSize(row.params)
        })) : []
    )
</script>

<div class="p-8">
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
    {:else}
        <p>No data available</p>
    {/if}
</div>