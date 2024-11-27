<script lang="ts">
	import * as Table from '$lib/components/ui/table/index'
	const data_headers = ['Name', 'Age', 'City']
	const data = [
		{ name: 'Alice', age: 25, city: 'New York' },
		{ name: 'Bob', age: 30, city: 'Los Angeles' },
		{ name: 'Charlie', age: 35, city: 'Chicago' },
		{ name: 'David', age: 40, city: 'Houston' },
		{ name: 'Eve', age: 45, city: 'Phoenix' },
	]
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			{#each data_headers as header}
				<Table.Head class="text-lg tracking-tight  text-balance"
					>{header}</Table.Head
				>
			{/each}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data as row}
			<Table.Row>
				<Table.Cell>{row.name}</Table.Cell>
				<Table.Cell>{row.age}</Table.Cell>
				<Table.Cell>{row.city}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
