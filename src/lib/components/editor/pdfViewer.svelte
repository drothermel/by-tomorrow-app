<script lang="ts">
	import { onMount } from 'svelte'
	import * as mupdf from 'mupdf'
	import logger from '$lib/logger'

	export let pdfUrl = ''

       let canvas: HTMLCanvasElement
	let error = ''

	onMount(async () => {
		if (typeof window === 'undefined') return

		try {
			// Fetch the PDF document
			const response = await fetch(pdfUrl)
			const arrayBuffer = await response.arrayBuffer()
			const buffer = new Uint8Array(arrayBuffer)

			// Open the document with MuPDF.js
			const doc = mupdf.Document.openDocument(buffer, 'application/pdf')
			const page = doc.loadPage(0) // Load the first page

			// Render the page to a canvas
			const dpi = 72
			const zoom = 1.5
			const pixmap = page.toPixmap(
				mupdf.Matrix.scale(zoom, zoom),
				mupdf.DeviceRGB
			)
			const imageData = new ImageData(
				new Uint8ClampedArray(pixmap.samples.buffer),
				pixmap.width,
				pixmap.height
			)

			// Draw the image data onto the canvas
                       const context = canvas.getContext('2d')
                       if (context) {
                               canvas.width = pixmap.width
                               canvas.height = pixmap.height
                               context.putImageData(imageData, 0, 0)
                       }
		} catch (err) {
			error = 'Failed to load PDF.'
			logger.error(err)
		}
	})
</script>

{#if error}
	<p class="text-red-500">{error}</p>
{:else}
	<div class="pdf-container">
		<canvas bind:this={canvas}></canvas>
	</div>
{/if}

<style>
	.pdf-container {
		width: 100%;
		overflow: auto;
		border: 1px solid #e5e7eb; /* Tailwind's gray-200 */
		border-radius: 0.375rem; /* Tailwind's rounded-md */
	}
</style>
