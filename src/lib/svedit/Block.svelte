<script lang="ts">
	import { Button } from '$lib/components/ui/button/index'
	import BlockData from '$lib/svedit/BlockData.svelte'
	import Block from '$lib/svedit/Block.svelte'
	import MarkdownBlock from '$lib/svedit/MarkdownBlock.svelte'
	import {
		Eye,
		Hash,
		SquareX,
		SquarePen,
		BetweenHorizontalStart,
		PanelTopOpen,
		PanelBottomOpen,
	} from 'lucide-svelte'

	interface Props {
		block: BlockData
	}
	let { block }: Props = $props()

	/**
	 * Determine the CSS grid layout for the toolbar depending on whether
	 * the block has children or is in markdown preview mode.
	 */
	function getGridColsCSS() {
		if (
			block.children.length > 0 ||
			(block.type === 'markdown' && block.markdown_setting === 'both')
		) {
			return 'grid-cols-1 h-15 w-5'
		} else {
			return 'grid-cols-3 h-10 w-15'
		}
	}

	let tPadding = block.parent === null ? 'pt-0' : 'pt-2'
	let bPadding = block.parent === null ? 'pb-2' : 'pb-2'
	let bgColor = block.parent !== null ? 'bg-slate-200 bg-opacity-50' : ''
</script>

<!-- class="w-full flex flex-row gap-1 px-2 min-h-10 {tPadding} {bPadding} border border-blue-400 {block.css_class}" -->
<!-- class="w-full flex flex-row gap-1 px-2 min-h-10 {tPadding} {bPadding} {bgColor} {block.css_class}" -->
<div
	class={{
		'w-full flex flex-row gap-1 px-2 min-h-10': true,
		'bg-slate-200 bg-opacity-50 py-2': block.parent !== null,
		'px-4 pt-4 pb-6': block.parent == null,
	}}
	contenteditable={block.editable}
>
	<div class="w-full flex flex-col gap-2 py-0 px-1 justify-center">
		<!-- Render Myself -->
		<div class="w-11/12 prose">
			{#if block.title}
				<h3>{block.title.text}</h3>
			{/if}

			{#if block.text}
				<span>{@html block.text.text.replace(/\n/g, '<br>')}</span>
			{/if}
		</div>

		{#if block.type === 'markdown'}
			<MarkdownBlock {block} />
		{/if}
		<!-- Render My Children -->
		{#each block.children as child (child.uuid)}
			<Block block={child} />
		{/each}
	</div>

	{#if block.parent !== null}
		<div class="flex flex-col gap-2">
			<div
				id="buttons"
				class="grid {getGridColsCSS()} gap-0 justify-center items-center mx-auto bg-white bg-opacity-50 rounded-sm"
			>
				<div class="h-5 w-5">
					<Button
						id="remove-block"
						variant="ghost"
						size="icon"
						class="h-5 w-5 rounded-sm hover:bg-destructive hover:text-destructive-foreground"
						onclick={() => block.removeSelfFromParent()}
					>
						<SquareX strokeWidth="1.5" color="#1e293b" />
					</Button>
				</div>
				<div class="h-5 w-5">
					<Button
						id="add-markdown"
						variant="ghost"
						size="icon"
						onclick={() => {
							block.setType('markdown')
						}}
						class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground"
					>
						<SquarePen strokeWidth="1.5" color="#1e293b" />
					</Button>
				</div>
				<div class="h-5 w-5">
					<Button
						id="preview"
						variant="ghost"
						size="icon"
						onclick={() => {
							block.markdown_setting = 'preview'
						}}
						class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground"
					>
						<Eye strokeWidth="1.5" color="#1e293b" />
					</Button>
				</div>
				<div class="h-5 w-5">
					<Button
						id="add-block-above"
						variant="ghost"
						size="icon"
						onclick={() => block.addBlockAbove()}
						class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground"
					>
						<PanelBottomOpen strokeWidth="1.5" color="#1e293b" />
					</Button>
				</div>
				<div class="h-5 w-5">
					<Button
						id="insert-new"
						variant="ghost"
						size="icon"
						onclick={() => block.addChildBlock()}
						class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground"
					>
						<BetweenHorizontalStart strokeWidth="1.5" color="#1e293b" />
					</Button>
				</div>
				<div class="h-5 w-5">
					<Button
						id="add-block-below"
						variant="ghost"
						size="icon"
						onclick={() => block.addBlockBelow()}
						class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground"
					>
						<PanelTopOpen strokeWidth="1.5" color="#1e293b" />
					</Button>
				</div>
			</div>
		</div>
	{/if}
</div>
