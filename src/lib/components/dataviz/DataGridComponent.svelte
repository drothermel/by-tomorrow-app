<script lang="ts">
    import { Grid, Willow } from '@svar-ui/svelte-grid'

    const comparisonColNames = [
        "comparison_model_size",
        "comparison_model_recipe",
        "comparison_metric",
    ]
    const matchedGroupIDColNames = [
        "matched_group_id",
        "matched_group_name",
    ]
    const ckptColNames = [
        "ckpt_data",
        "ckpt_params",
        "ckpt_steps",
    ]
    const coreHpmColNames = [
        "lr",
        "seed",
        "ft_tok",
    ]
    const tokDetailColNames = [
        "ft_tok_per_epoch",
        "ft_epochs",
        "ft_tok_real",
        "abs_difference_ft_tokens_pct",
    ]

    let { data}: { data: any } = $props()
    let ft_primary_cols = $derived(
        Object.keys(data[0]).filter((key: any) => key.includes('ft_') && key.includes('primary'))
    )
    let pt_primary_cols = $derived(
        Object.keys(data[0]).filter((key: any) => key.includes('pt_') && key.includes('primary'))
    )
    let list_cols = $derived(
        Object.keys(data[0]).filter((key: any) => key.includes('_list'))
    )
    let columns = $derived(

        matchedGroupIDColNames.map(
            (col, index) => ({
                id: col,
                width: 150,
                resize: true,
                sort: true,
                header: index === 0 ? [
                    {
                        text: "Matched Group ID Cols",
                        colspan: matchedGroupIDColNames.length,
                        collapsible: true,
                        collapsed: false
                    },
                    {
                        text: col
                    }
                ] : ["", col]
            })
        ).concat(
            ckptColNames.map(
                (col, index) => ({
                    id: col,
                    width: 150,
                    resize: true,
                    sort: index === 0 ? false : true,
                    header: index === 0 ? [
                        {
                            text: "Init Checkpoint Cols",
                            colspan: ckptColNames.length,
                            collapsible: true,
                            collapsed: false
                        },
                        {
                            text: col
                        }
                    ] : ["", col]
                })
            )
        ).concat(
            coreHpmColNames.map(
                (col, index) => ({
                    id: col,
                    width: 150,
                    resize: true,
                    sort: index === 0 ? false : true,
                    header: index === 0 ? [
                        {
                            text: "Core HP Metric Cols",
                            colspan: coreHpmColNames.length,
                            collapsible: true,
                            collapsed: false
                        },
                        {
                            text: col
                        }
                    ] : ["", col]
                })
            )
        ).concat(
            ft_primary_cols.map(
                (col, index) => ({
                    id: col,
                    width: 150,
                    resize: true,
                    sort: index === 0 ? false : true,
                    header: index === 0 ? [
                        {
                            text: "FT Primary Metric Cols",
                            colspan: ft_primary_cols.length,
                            collapsible: true,
                            collapsed: false
                        },
                        {
                            text: col
                        }
                    ] : ["", col]
                })
            )
        ).concat(
            pt_primary_cols.map(
                (col, index) => ({
                    id: col,
                    width: 150,
                    resize: true,
                    sort: index === 0 ? false : true,
                    header: index === 0 ? [
                        {
                            text: "PT Primary Metric Cols",
                            colspan: pt_primary_cols.length,
                            collapsible: true,
                            collapsed: false
                        },
                        {
                            text: col
                        }
                    ] : ["", col]
                })
            )
        ).concat(
            list_cols.map((col, index) => ({
                id: col,
                width: 150,
                resize: true,
                sort: index === 0 ? false : true,
                header: index === 0 
                ? [
                    { 
                        text: "List Cols", 
                        colspan: list_cols.length, 
                        collapsible: true, 
                        collapsed: true 
                    }, 
                    {text: col}
                ] 
                : ["", col]
            }))
        )
    )

</script>

{#if data.length > 0}
    <Willow>
        <Grid
            {data}
            columns={columns}
            reorder
        />
    </Willow>
{:else}
    <p>No data available</p>
{/if}