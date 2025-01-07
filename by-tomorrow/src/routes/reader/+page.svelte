<script lang="ts">
	import * as cheerio from 'cheerio'

	let { data }: { data: any } = $props()
	const htmlText = data.paperText
	const ch = cheerio.load(htmlText)

	const article = ch('article').html()
</script>

<div class="container mx-auto p-4">
	{#if data}
		<div class="prose">
			<pre>{article}</pre>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
