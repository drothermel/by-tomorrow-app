<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index'
import * as Tabs from '$lib/components/ui/tabs/index'
import * as Card from '$lib/components/ui/card/index'
import { Button, buttonVariants } from '$lib/components/ui/button/index'
import FileUp from 'lucide-svelte/icons/file-up'
import logger from '$lib/logger'

	class FileLoadDialogProps {
		input?: HTMLInputElement = $state()
		selected: File | null = $state(null)
		pdfContent = $state(null)

		readPdf(file) {
			const reader = new FileReader()
			reader.onload = (event) => {
				this.pdfContent = event.target.result // Data URL
			}
			reader.readAsDataURL(file)
		}

		handle_input_change(event: Event) {
                       logger.log('File change!')
			const input = event.target as HTMLInputElement
			if (input.files && input.files.length > 0) {
				const file = input.files[0]
				if (file.type === 'application/pdf') {
					this.selected = file
					this.readPdf(file)
				} else {
					alert('Please select a valid PDF file')
				}

				this.selected = input.files[0]
			}
                       logger.log(this.selected)
		}

		handle_trigger_input() {
                       logger.log('select button clicked')
			this.input?.click()
		}

		handle_upload(): void {
                       logger.log('File uploaded!')
		}

		// Save the PDF (creates a downloadable link)
		handleSavePdf() {
			if (this.selected) {
				const blob = new Blob([this.selected], { type: 'application/pdf' })
				const link = document.createElement('a')
				link.href = URL.createObjectURL(blob)
				link.download = this.selected.name
				link.click()
				URL.revokeObjectURL(link.href)
			} else {
				alert('No file selected to save.')
			}
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

							<!-- Save PDF Button -->
							<!-- <button
								class="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
								onclick={() => file_uploader.handleSavePdf()}
								disabled={!file_uploader.selected}
							>
								Save PDF
							</button> -->

							<!-- Display PDF (if available) -->
							{#if file_uploader.pdfContent}
								<div class="border border-gray-300 rounded overflow-hidden">
									<span>Content URL: {file_uploader.pdfContent}</span>
									<iframe
										class="w-full h-96"
										src={file_uploader.pdfContent}
										title="PDF Preview"
									></iframe>
								</div>
							{/if}
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
