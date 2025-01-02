<script lang="ts">
	import LibraryTable from '$lib/components/libraryTable.svelte'

	let { data } = $props()
	console.log(data)
	console.log(data.papers)

	const headers = [
		'Tags',
		'Title',
		'Authors',
		'Published',
		'Updated',
		'Categories',
		'Primary Category',
		'Comments',
		'Link',
	]
	let library: string[][] = $state(
		data.papers.map((paper) => [
			'',
			paper.title,
			paper.authors,
			new Date(paper.published).toLocaleDateString(),
			new Date(paper.updated).toLocaleDateString(),
			paper.categories,
			paper.primaryCategory,
			paper.comments ?? '',
			paper.absLink,
		])
	)
	let selected: string[] = $state([])
	function onRowsSelected(selectedIds: string[]) {
		selected = selectedIds
	}
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-lg font-semibold">Paper Library</h1>
	<LibraryTable {headers} data={library} {onRowsSelected} />
</div>
