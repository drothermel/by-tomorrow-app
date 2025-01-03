<script lang="ts">
	import * as Table from '$lib/components/ui/table/index'
	import { Badge } from '$lib/components/ui/badge/index'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	export type TableData = {
		id: string
		data: string[]
	}

	interface Props {
		headers: string[]
		data: TableData[]
		onRowsSelected: (selectedIds: string[]) => void
	}
	let { headers, data, onRowsSelected }: Props = $props()

	let visibleHeaders: string[] = $derived(headers)
	let allIds: string[] = $derived(data.map((row) => row.id))
	let selectedRows: string[] = $state([])

	function isSelected(id: string): boolean {
		return selectedRows.includes(id)
	}
	function isAllSelected(): boolean {
		return selectedRows.length === allIds.length
	}

	function toggleRowSelected(id: string): void {
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
			selectedRows = allIds
		}
		onRowsSelected(selectedRows)
	}
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
			{#each data as row}
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
						{#if headers[index].toLowerCase().includes('tags')}
							<Table.Cell class="flex flex-wrap gap-1">
								{#each JSON.parse(cell) as tag}
									<Badge variant="secondary">{tag}</Badge>
								{/each}
							</Table.Cell>
						{:else if headers[index].toLowerCase().includes('link')}
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
