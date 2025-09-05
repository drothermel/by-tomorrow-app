<script lang="ts">
	import * as Card from '$lib/components/ui/card/index'
	import { Badge } from '$lib/components/ui/badge'

	let { title, time, tags, text } = $props()
</script>

<Card.Root class="w-full relative">
	<Card.Header>
		<div class="flex flex-row">
               <Card.Title class="text-xl font-bold" level={3}>{title}</Card.Title>
		</div>
		<Card.Description class="flex flex-col gap-1">
			Created: {time.toLocaleString()}
			{#if tags.length > 0 && tags[0] !== ''}
				<div class="flex flex-row gap-2">
					{#each tags as tag}
						<Badge class="text-xs">{tag}</Badge>
					{/each}
				</div>
			{/if}
		</Card.Description>
	</Card.Header>

	<Card.Content class="grid">
		<p class="text-sm leading-none p-1">{text}</p>
	</Card.Content>
</Card.Root>
