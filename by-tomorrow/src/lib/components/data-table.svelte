<script lang="ts">
	import * as Table from '$lib/components/ui/table/index'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	const data_headers = ['Name', 'Age', 'City']
	const data = [
		{ id: '0', name: 'Alice', age: 25, city: 'New York' },
		{ id: '1', name: 'Bob', age: 30, city: 'Los Angeles' },
		{ id: '2', name: 'Charlie', age: 35, city: 'Chicago' },
		{ id: '3', name: 'David', age: 40, city: 'Houston' },
		{ id: '4', name: 'Eve', age: 45, city: 'Phoenix' },
	]
	let selectedRows = $state(new Set<string>())

	function isSelected(id: string): boolean {
		return selectedRows.has(id)
	}

	function toggleRowSelected(id: string): void {
		if (selectedRows.has(id)) {
			selectedRows.delete(id)
		} else {
			selectedRows.add(id)
		}
		selectedRows = new Set(selectedRows) // Trigger reactivity
	}
	$effect(() => {
		console.log(selectedRows)
	})
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>
				<Checkbox
					checked={false}
					onchange={() => {
						console.log('clicked check all')
					}}
				/>
			</Table.Head>
			{#each data_headers as header}
				<Table.Head class="text-lg tracking-tight  text-balance">
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
				<Table.Cell>{row.name}</Table.Cell>
				<Table.Cell>{row.age}</Table.Cell>
				<Table.Cell>{row.city}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
