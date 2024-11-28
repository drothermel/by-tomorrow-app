<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js'
	import { Button, buttonVariants } from '$lib/components/ui/button/index'
	import FileUp from 'lucide-svelte/icons/file-up'
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<FileUp /> Add File
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Upload File</Dialog.Title>
			<Dialog.Description>Choose a local file to upload.</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
