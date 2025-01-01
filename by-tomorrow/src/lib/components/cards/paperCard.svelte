<script lang="ts">
	import * as Card from '$lib/components/ui/card/index'
	import { Badge } from '$lib/components/ui/badge'
	import type { ArxivMetadata, ArxivQuery } from '$lib/schemas'

	let { metadata, query }: { metadata: ArxivMetadata; query: ArxivQuery } =
		$props()
	let published = new Date(metadata.published)
</script>

<Card.Root class="w-full relative">
	<Card.Header>
		<Card.Title tag="h3" class="text-xl font-bold">{metadata.title}</Card.Title>
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
		<!-- <p class="text-sm leading-none p-1">{metadata.summary}</p> -->
		<p
			class="px-1 text-base leading-relaxed text-pretty font-normal tracking-normal text-gray-700"
		>
			{metadata.summary}
		</p>
	</Card.Content>
</Card.Root>
