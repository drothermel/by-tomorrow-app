<script lang="ts">
	import * as Card from '$lib/components/ui/card/index'
	import { Badge } from '$lib/components/ui/badge'
	import type { ArxivMetadata, ArxivQuery } from '$lib/schemas'

	let {
		metadata,
		query,
		handleCardClick,
		selected,
		library,
	}: {
		metadata: ArxivMetadata
		query: ArxivQuery
		handleCardClick: (event: MouseEvent, elemId: string) => void
		selected: boolean
		library: boolean
	} = $props()
	let published = new Date(metadata.published)
</script>

<Card.Root
	class={{
		'w-full relative': true,
		'cursor-pointer hover:shadow-xl hover:shadow-slate-400 hover:border-slate-400':
			!library,
		'border-4 border-indigo-300 shadow-lg shadow-indigo-200': selected,
		'border-2 border-emerald-700 border-opacity-50 shadow-sm shadow-emerald-100 bg-emerald-50 bg-opacity-50':
			library,
	}}
	onclick={(event) => {
		handleCardClick(event, metadata.id)
	}}
>
	<Card.Header>
		<Card.Title>
			<h3 class="text-xl font-bold leading-tight tracking-tight text-pretty">
				{metadata.title}
			</h3>
		</Card.Title>
		<Card.Description class="flex flex-col gap-2">
			{#if metadata.author.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each metadata.author as author}
						<Badge
							variant={author !== query?.author ? 'outline' : 'default'}
							class="text-xs text-nowrap">{author}</Badge
						>
					{/each}
				</div>
			{/if}
			<span
				>Published: {published.toLocaleString()},
				<a class="underline" href={metadata.links['absLink']}
					>{metadata.links['absLink']}</a
				>
			</span>
		</Card.Description>
	</Card.Header>

	<Card.Content class="grid">
		<p
			class="px-1 text-base leading-relaxed text-pretty font-normal tracking-normal text-gray-700"
		>
			{metadata.summary}
		</p>
	</Card.Content>
</Card.Root>
