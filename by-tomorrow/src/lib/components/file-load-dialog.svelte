<script lang="ts">
	import LocalFileCard from '$lib/components/load/local-file-card.svelte'
	import ArixvCard from '$lib/components/load/arxiv-card.svelte'
	import * as Dialog from '$lib/components/ui/dialog/index'
	import * as Tabs from '$lib/components/ui/tabs/index'
	import { Button, buttonVariants } from '$lib/components/ui/button/index'
	import FileUp from 'lucide-svelte/icons/file-up'
	import ArxivCard from '$lib/components/load/arxiv-card.svelte'

	function handleUpload() {
		console.log('Upload file!')
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<FileUp /> Add File
	</Dialog.Trigger>
	<Dialog.Content>
		<div class="justify-center flex">
			<Tabs.Root value="local" class="w-[400px]">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="local">Local File</Tabs.Trigger>
					<Tabs.Trigger value="arxiv">Arxiv URL</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="local">
					<LocalFileCard {handleUpload} />
				</Tabs.Content>
				<Tabs.Content value="arxiv"><ArxivCard /></Tabs.Content>
			</Tabs.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
