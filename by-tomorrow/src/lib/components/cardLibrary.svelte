<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity'

	import { createTagsInput, melt } from '@melt-ui/svelte'

	import { Label } from '$lib/components/ui/label/index.js'
	import * as Dialog from '$lib/components/ui/dialog'
	import { Separator } from '$lib/components/ui/separator/index.js'

	import { X } from 'lucide-svelte'

	import type { ArxivMetadataList, ArxivQuery } from './../schemas.ts'
	import PaperCard from '$lib/components/cards/paperCard.svelte'
	import Button from './ui/button/button.svelte'
	let { data, query }: { data: ArxivMetadataList; query: ArxivQuery } = $props()

	// This is a subset of return values
	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags },
	} = createTagsInput()
	let library: SvelteSet<string> = $state(new SvelteSet())

	let selected: SvelteSet<string> = $state(new SvelteSet())
	function toggleSelected(elemId: string): void {
		if (selected.has(elemId)) {
			selected.delete(elemId)
		} else {
			selected.add(elemId)
		}
		console.log(selected)
	}
	function handleCardClick(event: MouseEvent, elemId: string): void {
		console.log(`Card ${elemId} clicked!`, event)
		toggleSelected(elemId)
	}
	function saveToLibrary() {
		console.log('Save Selected to Library:', selected)
		console.log('   used tags:', $tags)
		library = new SvelteSet([...library, ...selected])
		selected.clear()
	}
</script>

<div class="flex flex-col gap-4 mt-5 mb-20">
	<div class="flex flex-row justify-between items-center">
		<h3 class="text-xl font-bold tracking-tight text-balance">
			Retrieved Results
		</h3>
		<Dialog.Root>
			<Dialog.Trigger>
				<Button
					class={{
						'font-semibold text-md tracking-normal': true,
						'bg-indigo-400 hover:bg-indigo-800': selected.size > 0,
						'pointer-events-none bg-slate-400': selected.size === 0,
					}}
					size="sm"
				>
					Save Selected to Library
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Save Papers to Library</Dialog.Title>
					<Dialog.Description>
						Verify that you want to save the following papers to your library,
						and update tags to bulk add to these papers.
					</Dialog.Description>
				</Dialog.Header>
				<Label for="tagInput" class="font-semibold">
					Bulk Add Tags
					<div
						use:melt={$root}
						id="tagInput"
						class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-magnum-700
    focus-within:ring focus-within:ring-magnum-400 border-slate-400 border-1 mt-2"
					>
						{#each $tags as t}
							<div
								use:melt={$tag(t)}
								class="flex items-center overflow-hidden rounded-md bg-indigo-100 text-indigo-900 [word-break:break-word]
      data-[disabled]:bg-indigo-300 data-[selected]:bg-indigo-200 data-[disabled]:hover:cursor-default
        data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
							>
								<span
									class="flex items-center font-medium border-r border-indigo-300 py-1 px-1.5"
									>{t.value}</span
								>
								<button
									use:melt={$deleteTrigger(t)}
									class="flex h-full items-center px-1 enabled:hover:bg-indigo-300"
								>
									<X class="size-3" />
								</button>
							</div>
							<div
								use:melt={$edit(t)}
								class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
							></div>
						{/each}

						<input
							use:melt={$input}
							type="text"
							placeholder="Enter tags..."
							class="min-w-[4.5rem] shrink grow basis-0 border-0 font-medium text-black outline-none focus:!ring-0 data-[invalid]:text-red-500"
						/>
					</div>
				</Label>
				<div class="flex flex-col">
					<h3 class="text-sm font-semibold">Papers to Save</h3>
					<div class="flex flex-col gap-2 p-2 mb-4">
						{#each Array.from(selected) as id}
							<div
								class="flex flex-row gap-2 py-1 rounded-sm hover:bg-indigo-100"
							>
								<button
									onclick={() => {
										toggleSelected(id)
									}}
									class="flex h-full items-center px-1"
								>
									<X class="size-3" />
								</button>
								<span class="text-sm leading-snug">
									{data.find((m) => m.id === id)?.title}
								</span>
							</div>
						{/each}
					</div>
					<Dialog.Close>
						<Button type="submit" class="text-md" onclick={saveToLibrary}>
							Save
						</Button>
					</Dialog.Close>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div id="cardlib" class="mb-5">
		{#if data.length > 0}
			<div class="flex flex-col items-center gap-4">
				{#each data as metadata (metadata.id)}
					<PaperCard
						{metadata}
						{query}
						{handleCardClick}
						selected={selected.has(metadata.id)}
						library={library.has(metadata.id)}
					/>
				{/each}
			</div>
		{:else}
			<div class="p-4 prose-sm bg-slate-50">
				<p>No Results to Show</p>
			</div>
		{/if}
	</div>
	<Separator />
</div>
