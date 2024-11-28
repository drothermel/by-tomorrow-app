<script lang="ts">
	import LocalFileCard from '$lib/components/load/local-file-card.svelte'
	import * as Dialog from '$lib/components/ui/dialog/index.js'
	import { Button, buttonVariants } from '$lib/components/ui/button/index'
	import FileUp from 'lucide-svelte/icons/file-up'

	function handleUpload() {
		console.log('Upload file!')
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<FileUp /> Add File
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Upload File</Dialog.Title>
			<LocalFileCard {handleUpload} />
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
