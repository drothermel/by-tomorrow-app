<script lang="ts">
	import * as Table from '$lib/components/ui/table/index'
import { Badge } from '$lib/components/ui/badge/index'
import { Checkbox } from '$lib/components/ui/checkbox/index'
import logger from '$lib/logger'

	interface Props {
		headers: string[]
		data: string[][]
		onRowsSelected: (selectedIds: string[]) => void
	}
	let { headers, data, onRowsSelected }: Props = $props()

	type Data = {
		id: string
		data: string[]
	}

	let visibleHeaders: string[] = $derived(headers)
	let allRows: Data[] = $derived(
		data.map((row) => ({
			id: row[headers.length - 1] ?? crypto.randomUUID(),
			data: row,
		}))
	)
	let selectedRows: string[] = $state([])

	function isSelected(id: string): boolean {
		return selectedRows.includes(id)
	}
	function isAllSelected(): boolean {
		return selectedRows.length === allRows.length
	}

       function toggleRowSelected(id: string): void {
               logger.log('Selected toggle: ', id)
		if (isSelected(id)) {
			selectedRows = selectedRows.filter((rowId) => rowId !== id)
		} else {
			selectedRows = [...selectedRows, id]
		}
		onRowsSelected(selectedRows)
	}
	function toggleAllSelection(): void {
		if (isAllSelected()) {
			selectedRows = []
		} else {
			selectedRows = allRows.map((row) => row.id)
		}
		onRowsSelected(selectedRows)
	}

       $effect(() => {
               logger.log('Selected:', $state.snapshot(selectedRows))
       })
</script>

<div class="w-full flex flex-col">
	<Table.Root>
		<Table.Header>
			<Table.Row class="bg-slate-50">
				<Table.Head>
					<Checkbox
						checked={isAllSelected()}
						onCheckedChange={(checked) => {
							toggleAllSelection()
						}}
					/>
				</Table.Head>
				{#each visibleHeaders as header}
					<Table.Head class="text-sm tracking-tight text-balance">
						{header}
					</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each allRows as row}
				<Table.Row>
					<Table.Cell>
						<Checkbox
							checked={isSelected(row.id)}
							onCheckedChange={(checked) => {
								toggleRowSelected(row.id)
							}}
						/>
					</Table.Cell>
					{#each row.data as cell, index}
						{#if index === 0}
							<Table.Cell class="flex flex-wrap gap-1">
								{#each JSON.parse(cell) as tag}
									<Badge variant="secondary">{tag}</Badge>
								{/each}
							</Table.Cell>
						{:else if index === 8}
							<Table.Cell>
								<a href={cell}>{cell}</a>
							</Table.Cell>
						{:else}
							<Table.Cell>{cell}</Table.Cell>
						{/if}
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
