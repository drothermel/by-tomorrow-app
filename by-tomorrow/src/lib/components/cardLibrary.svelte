<script lang="ts">
	import type { ArxivMetadataList, ArxivQuery } from './../schemas.ts'
	import PaperCard from '$lib/components/cards/paperCard.svelte'
	let { data, query }: { data: ArxivMetadataList; query: ArxivQuery } = $props()
</script>

<div class="flex flex-col items-center gap-4">
	{#each data as metadata (metadata.id)}
		<PaperCard {metadata} {query} />
	{/each}
</div>
