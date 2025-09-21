import <script lang="ts">
    import { onMount } from 'svelte'
    import { Chart, Layer, Axis, Points, Spline, LineChart } from 'layerchart'
    import { curveMonotoneX } from 'd3-shape'
    import { scaleLog } from 'd3-scale'
    import { Grid, Willow } from '@svar-ui/svelte-grid'

    let chartData: any[] = []
    let loading = true
    let selectedRows: any = []
    let selectedRowsValue: number[] = []
    let filteredChartData: any[] = []
    let gridApi: any = null


    // Reactive statement to update chart data when selectedRowsValue changes
    $: {
        console.log('Reactive update - selectedRowsValue:', selectedRowsValue)

        if (selectedRowsValue.length === 0) {
            filteredChartData = []
        } else {
            filteredChartData = chartData.filter(row => selectedRowsValue.includes(row.id))
        }
        console.log('Reactive update - filteredChartData length:', filteredChartData.length)
    }

    // State for multiple datasets
    let additionalDatasets: { [key: string]: { data: any[], loading: boolean, collapsed: boolean, title: string, columns: any[] } } = {}

    // Define the additional endpoints
    const additionalEndpoints = [
        { url: '/api/visualize/data/ft', title: 'Full Finetuning + PT Data', key: 'ft' },
        { url: '/api/visualize/data', title: 'Full PT Data', key: '60M_pile' }
    ]

    const columns = [
        {
            id: "params",
            header: "Parameters",
            width: 150,
            sort: true
        },
        {
            id: "value",
            header: "Pile Val PPL",
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

    // Function to generate columns dynamically from data structure with grouping
    function generateColumns(data: any[]): any[] {
        if (!data || data.length === 0) return []

        const sampleRow = data[0]
        const allKeys = Object.keys(sampleRow)

        // Smart grouping based on common patterns
        const modelColumns = allKeys.filter(key =>
            key.includes('param') || key.includes('model') || key.includes('size')
        )
        const metricColumns = allKeys.filter(key =>
            key.includes('ppl') || key.includes('loss') || key.includes('acc') ||
            key.includes('metric') || key.includes('eval') || key.includes('val')
        )
        const trainingColumns = allKeys.filter(key =>
            key.includes('step') || key.includes('epoch') || key.includes('lr') ||
            key.includes('batch') || key.includes('token')
        )
        const dataColumns = allKeys.filter(key =>
            key.includes('data') || key.includes('source') || key.includes('dataset')
        )
        const otherColumns = allKeys.filter(key =>
            !modelColumns.includes(key) && !metricColumns.includes(key) &&
            !trainingColumns.includes(key) && !dataColumns.includes(key)
        )

        // Create grouped columns with collapsible headers
        const columns = []
        let colIndex = 0

        // Model Information Group
        if (modelColumns.length > 0) {
            modelColumns.forEach((key, index) => {
                columns.push({
                    id: key,
                    header: [
                        index === 0 ? {
                            text: "Model Information",
                            colspan: modelColumns.length,
                            collapsible: true,
                            collapsed: false
                        } : { text: "" },
                        { text: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ') }
                    ],
                    width: 120,
                    sort: true
                })
            })
            colIndex += modelColumns.length
        }

        // Performance Metrics Group
        if (metricColumns.length > 0) {
            metricColumns.forEach((key, index) => {
                columns.push({
                    id: key,
                    header: [
                        index === 0 ? {
                            text: "Performance Metrics",
                            colspan: metricColumns.length,
                            collapsible: true,
                            collapsed: false
                        } : { text: "" },
                        { text: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ') }
                    ],
                    width: 120,
                    sort: true
                })
            })
        }

        // Training Details Group
        if (trainingColumns.length > 0) {
            trainingColumns.forEach((key, index) => {
                columns.push({
                    id: key,
                    header: [
                        index === 0 ? {
                            text: "Training Details",
                            colspan: trainingColumns.length,
                            collapsible: true,
                            collapsed: true
                        } : { text: "" },
                        { text: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ') }
                    ],
                    width: 120,
                    sort: true
                })
            })
        }

        // Data Source Group
        if (dataColumns.length > 0) {
            dataColumns.forEach((key, index) => {
                columns.push({
                    id: key,
                    header: [
                        index === 0 ? {
                            text: "Data Sources",
                            colspan: dataColumns.length,
                            collapsible: true,
                            collapsed: true
                        } : { text: "" },
                        { text: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ') }
                    ],
                    width: 120,
                    sort: true
                })
            })
        }

        // Other Columns Group
        if (otherColumns.length > 0) {
            otherColumns.forEach((key, index) => {
                columns.push({
                    id: key,
                    header: [
                        index === 0 && otherColumns.length > 1 ? {
                            text: "Additional Data",
                            colspan: otherColumns.length,
                            collapsible: true,
                            collapsed: true
                        } : otherColumns.length === 1 ? { text: "", colspan: 1 } : { text: "" },
                        { text: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ') }
                    ],
                    width: 120,
                    sort: true
                })
            })
        }

        return columns
    }

    // Function to fetch additional datasets
    async function fetchAdditionalData(endpoint: { url: string, title: string, key: string }) {
        additionalDatasets[endpoint.key] = {
            data: [],
            loading: true,
            collapsed: true,
            title: endpoint.title,
            columns: []
        }

        try {
            const response = await fetch(`https://api.bytomorrow.app${endpoint.url}`)
            const result = await response.json()
            const data = result.data || []

            additionalDatasets[endpoint.key] = {
                data,
                loading: false,
                collapsed: true,
                title: endpoint.title,
                columns: generateColumns(data)
            }
        } catch (error) {
            console.error(`Error fetching ${endpoint.title}:`, error)
            additionalDatasets[endpoint.key].loading = false
        }
    }

    // Toggle collapse state for datasets
    function toggleDataset(key: string) {
        if (additionalDatasets[key]) {
            additionalDatasets[key].collapsed = !additionalDatasets[key].collapsed
        }
    }

    // Handle grid initialization and setup event listeners
    function handleGridInit(api: any) {
        gridApi = api
        console.log('Grid API initialized:', api)
        console.log('Available API methods:', Object.keys(api))

        // Listen for selection changes
        api.on('select-row', (event: any) => {
            console.log('Row selection event:', event)
            console.log('Event detail:', event)
            updateSelectionFromGrid()
        })

        // Initialize selection state
        setTimeout(() => {
            updateSelectionFromGrid()
            console.log('Initial API state after timeout:', api.getReactiveState?.())
        }, 100)
    }

    // Update selection state from grid
    function updateSelectionFromGrid() {
        if (gridApi && gridApi.getReactiveState) {
            const state = gridApi.getReactiveState()
            console.log('Full reactive state:', state)
            selectedRows = state.selectedRows || []

            // Subscribe to the selectedRows store to get actual values
            if (selectedRows && selectedRows.subscribe) {
                selectedRows.subscribe((value: any) => {
                    console.log('Store subscription - selectedRows value:', value)
                    selectedRowsValue = Array.isArray(value) ? value : []
                    console.log('Store subscription - selectedRowsValue:', selectedRowsValue)
                })
            }

            console.log('Updated selectedRows from grid:', selectedRows)
        } else {
            console.log('Grid API or getReactiveState not available')
        }
    }

    // Select all rows
    function selectAll() {
        if (gridApi) {
            console.log('Selecting all rows via API...')

            // Individual selection with proper multi-select
            chartData.forEach((row, index) => {
                console.log('Selecting row ID:', row.id)
                gridApi.exec('select-row', {
                    id: row.id,
                    mode: true,
                    toggle: false,
                    range: false // Ensure we don't use range selection
                })
            })

            // Force update after a brief delay
            setTimeout(() => {
                updateSelectionFromGrid()
            }, 100)
        } else {
            console.log('Grid API not available for selectAll')
        }
    }

    // Clear all selections
    function clearSelection() {
        if (gridApi) {
            console.log('Clearing all selections via API...')

            try {
                // Approach 1: Use unselect-all if available
                if (gridApi.exec && typeof gridApi.exec === 'function') {
                    gridApi.exec('unselect-all')
                    console.log('Executed unselect-all command')
                }
            } catch (e) {
                console.log('unselect-all failed, trying individual deselection')
                // Approach 2: Individual deselection
                chartData.forEach(row => {
                    console.log('Deselecting row ID:', row.id)
                    gridApi.exec('select-row', {
                        id: row.id,
                        mode: false,
                        toggle: false
                    })
                })
            }

            // Force update after a brief delay
            setTimeout(() => {
                updateSelectionFromGrid()
            }, 50)
        } else {
            console.log('Grid API not available for clearSelection')
        }
    }

    async function fetchData() {
        try{
            const response = await fetch('https://api.bytomorrow.app/api/visualize/data/small')
            const result = await response.json()
            chartData = result.data.sort((a: any, b: any) =>
                parseParameterSize(a.params) - parseParameterSize(b.params)
            )
            chartData = chartData.map((row, index) => ({
                ...row,
                id: index, // Add unique ID for row selection
                params_numeric: parseParameterSize(row.params)
            }))

            // Don't initialize selectedRows here - let the grid manage its own state
            console.log('Chart data loaded with IDs:', chartData.map(row => ({ id: row.id, params: row.params })))
            console.log('Full chart data:', chartData)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            loading = false
        }
    }

    onMount(async () => {
        // Fetch main chart data
        await fetchData()

        // Fetch additional datasets
        for (const endpoint of additionalEndpoints) {
            fetchAdditionalData(endpoint)
        }
    })
</script>

<div class="p-8">
    <h1 class="text-2xl font-bold mb-6">ML Scaling Analysis</h1>
    {#if loading}
        <p>Loading viz...</p>
    {:else if chartData.length > 0}
        <div class="h-96 md:h-80 w-full p-4 border rounded-sm">
            <LineChart
                data={filteredChartData} x="params_numeric" y="value" 
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
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">Chart Data Table</h2>
                <div class="flex gap-2">
                    <button
                        on:click={selectAll}
                        class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors"
                    >
                        Select All
                    </button>
                    <button
                        on:click={clearSelection}
                        class="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
                    >
                        Clear Selection
                    </button>
                </div>
            </div>
            <div class="mb-2">
                <p class="text-sm text-gray-600">
                    {selectedRowsValue.length} of {chartData.length} rows selected • Chart shows {filteredChartData.length} data points
                </p>
                <p class="text-xs text-gray-500">
                    💡 Click rows to select. For Mac: Hold Cmd+click for multi-select or Shift+click for range
                </p>
            </div>
            <div class="border rounded-sm">
                <Willow>
                    <Grid
                        data={chartData}
                        {columns}
                        select={true}
                        multiselect={true}
                        init={handleGridInit}
                    />
                </Willow>
            </div>
        </div>

        <!-- Additional Large Datasets -->
        {#each additionalEndpoints as endpoint}
            {@const dataset = additionalDatasets[endpoint.key]}
            {#if dataset}
                <div class="mt-8">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-semibold">{dataset.title}</h2>
                        <button
                            on:click={() => toggleDataset(endpoint.key)}
                            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                        >
                            {dataset.collapsed ? 'Show Table' : 'Hide Table'}
                            <span class="ml-2">{dataset.collapsed ? '▼' : '▲'}</span>
                        </button>
                    </div>

                    {#if dataset.loading}
                        <p class="text-gray-600">Loading {dataset.title.toLowerCase()}...</p>
                    {:else if !dataset.collapsed}
                        <div class="border rounded-sm overflow-hidden">
                            <div class="max-h-96 overflow-auto">
                                <Willow>
                                    <Grid
                                        data={dataset.data}
                                        columns={dataset.columns}
                                        height={350}
                                    />
                                </Willow>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mt-2">
                            Showing {dataset.data.length} rows × {dataset.columns.length} columns
                        </p>
                    {:else if dataset.data.length > 0}
                        <p class="text-gray-600">
                            Dataset ready: {dataset.data.length} rows × {dataset.columns.length} columns
                        </p>
                    {/if}
                </div>
            {/if}
        {/each}
    {:else}
    <p>No data available</p>
    {/if}
</div>