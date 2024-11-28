<script lang="ts">
	import { Button } from '$lib/components/ui/button/index'
	import * as Card from '$lib/components/ui/card/index'

	let handleUpload: () => void = $props()

	let fileInput: HTMLInputElement | undefined = $state()
	let open: boolean = $state(false)
	let selectedFile: File | null = $state(null)

	function handleFileChange(event: Event) {
		console.log('File change!')
		const input = event.target as HTMLInputElement
		if (input.files && input.files.length > 0) {
			selectedFile = input.files[0]
		}
		console.log(selectedFile)
	}

	function handleSelectButtonClick() {
		console.log('select button clicked')
		fileInput?.click()
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Local File</Card.Title>
		<Card.Description>
			<p>Choose a local file to upload to your library.</p>
			<p class="italic">Accepted formats: pdf.</p>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<input
			type="file"
			class="hidden"
			bind:this={fileInput}
			onchange={handleFileChange}
		/>
		<div class="flex flex-row items-center gap-4">
			<Button size="sm" variant="outline" onclick={handleSelectButtonClick}>
				Select File
			</Button>
			<p class="text-xs">
				<span class="font-bold">Selected: </span>
				<span class="italic"> {selectedFile ? selectedFile.name : 'None'}</span>
			</p>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button onclick={handleUpload}>Upload</Button>
	</Card.Footer>
</Card.Root>
