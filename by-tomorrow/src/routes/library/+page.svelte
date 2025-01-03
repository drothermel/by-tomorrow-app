<script lang="ts">
	import LibraryTable from '$lib/components/libraryTable.svelte'
	import Button from '$lib/components/ui/button/button.svelte'
	import type { TableData } from '$lib/components/libraryTable.svelte'
	import type { LibraryPageData } from '$lib/schemas.js'
	import type { PaperMetadata } from '@prisma/client'
	import { onMount } from 'svelte'

	let { data }: { data: LibraryPageData } = $props()

	const headers = [
		'Tags',
		'Title',
		'Authors',
		'Published',
		'Updated',
		'Primary Category',
		'Categories',
		'Comments',
		'Link',
	]
	function convertPaperMetadataToTableData(
		paperMetadata: PaperMetadata[]
	): TableData[] {
		return paperMetadata.map((paper) => {
			return {
				id: paper.arxivId,
				data: [
					paper.tags ?? '',
					paper.title,
					paper.authors,
					new Date(paper.published).toLocaleDateString(),
					new Date(paper.updated).toLocaleDateString(),
					paper.primaryCategory,
					paper.categories,
					paper.comments ?? '',
					paper.pdfLink,
				],
			}
		})
	}

	// Initialize library with the +page.server.ts load function
	let library: TableData[] = $state(
		convertPaperMetadataToTableData(data.papers)
	)

	// But then make it possible to refetch whenever
	async function fetchPapers() {
		try {
			const response = await fetch('/api/papers?metadata')
			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`)
			}
			let responseJson = await response.json()
			library = convertPaperMetadataToTableData(responseJson.allMetadata)
		} catch (err) {
			alert('An error occurred while fetching papers.')
			console.error(err)
		}
	}

	// Setup selected papers
	let selected: string[] = $state([])
	function onRowsSelected(selectedIds: string[]) {
		selected = selectedIds
	}
	async function removeSelectedFromLibrary() {
		try {
			const response = await fetch('/api/papers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					action: 'removePaperMetadata',
					data: { arxivIDs: selected },
				}),
			})

			if (!response.ok) {
				const error = await response.json()
				console.error('Error:', error)
				alert(`Error: ${error.error || 'Unknown error'}`)
				return
			}

			const result = await response.json()
			selected = []
			await fetchPapers()
		} catch (error) {
			console.error('Network or server error:', error)
			alert('An error occurred while communicating with the server.')
		}
	}

	onMount(fetchPapers)
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row justify-between items-center">
		<h1 class="text-lg font-semibold">Paper Library</h1>
		<Button
			onclick={removeSelectedFromLibrary}
			class="bg-rose-300 text-slate-800">Remove Selected</Button
		>
	</div>
	<LibraryTable {headers} data={library} {onRowsSelected} />
</div>
