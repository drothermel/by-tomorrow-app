<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index'
	import * as Tabs from '$lib/components/ui/tabs/index'
	import * as Card from '$lib/components/ui/card/index'
	import { Button, buttonVariants } from '$lib/components/ui/button/index'
	import FileUp from 'lucide-svelte/icons/file-up'

	class FileLoadDialogProps {
		input?: HTMLInputElement = $state()
		selected: File | null = $state(null)

		handle_input_change(event: Event) {
			console.log('File change!')
			const input = event.target as HTMLInputElement
			if (input.files && input.files.length > 0) {
				this.selected = input.files[0]
			}
			console.log(this.selected)
		}

		handle_trigger_input() {
			console.log('select button clicked')
			this.input?.click()
		}

		handle_upload(): void {
			console.log('File uploaded!')
		}
	}

	const file_uploader = new FileLoadDialogProps()
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

				<!-- Local File Upload Tab -->
				<Tabs.Content value="local">
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
								bind:this={file_uploader.input}
								onchange={(event) => file_uploader.handle_input_change(event)}
							/>
							<div class="flex flex-row items-center gap-4">
								<Button
									size="sm"
									variant="outline"
									onclick={() => file_uploader.handle_trigger_input()}
								>
									Select File
								</Button>
								<p class="text-xs">
									<span class="font-bold">Selected: </span>
									<span class="italic">
										{file_uploader.selected
											? file_uploader.selected.name
											: 'None'}</span
									>
								</p>
							</div>
						</Card.Content>
						<Card.Footer>
							<Button onclick={file_uploader.handle_upload}>Upload</Button>
						</Card.Footer>
					</Card.Root>
				</Tabs.Content>

				<!-- Local File Upload Tab -->
				<Tabs.Content value="arxiv">
					<Card.Root>
						<Card.Header>
							<Card.Title>Arxiv URL</Card.Title>
							<Card.Description>
								Specify an arxiv URL to add a paper from arxiv to your library.
							</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-2">
							<span>TBD</span>
						</Card.Content>
						<Card.Footer>
							<Button onclick={file_uploader.handle_upload}>Upload</Button>
						</Card.Footer>
					</Card.Root>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
