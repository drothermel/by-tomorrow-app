<script>
	import Input from '$lib/components/ui/input/input.svelte'
	import { Label } from '$lib/components/ui/label/index'

	let pdfUrl = $state('http://arxiv.org/pdf/1511.07916v1')
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">PDF Viewer</h1>
	<div class="flex flex-row gap-2">
		<Label for="pdfurl">PDF Link:</Label>
		<Input bind:value={pdfUrl} id="pdfurl" placeholder="Enter link to pdf" />
	</div>
	<iframe src={pdfUrl} class="pdf-container min-h-screen" />
</div>

<style>
	.pdf-container {
		width: 100%;
		overflow: auto;
		border: 1px solid #e5e7eb; /* Tailwind's gray-200 */
		border-radius: 0.375rem; /* Tailwind's rounded-md */
	}
</style>
