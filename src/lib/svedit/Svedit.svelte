<script lang="ts">
	import SveditSession from '$lib/svedit/SveditSession.svelte'
	import { setSveditSession } from '$lib/svedit/context'
	import Block from '$lib/svedit/Block.svelte'
	import logger from '$lib/logger'

	let {
		sveditSession,
		ref = $bindable(),
		class: css_class,
	}: {
		sveditSession: SveditSession
		ref?: any
		class?: string
	} = $props()
	setSveditSession(sveditSession)

	/**
	 * Experimental handler that logs text insertion attempts. Prevents the
	 * default browser behaviour so we can intercept input.
	 */
	function onbeforeinput(event: any) {
		const inserted_char = event.data

		event.preventDefault()
		if (inserted_char) {
			logger.log('tried to insert text: ', inserted_char)
			// entry_session.insert_text(inserted_char);
		}
	}
</script>

<div class="svedit">
	<!-- <div class="svedit-canvas {css_class}" bind:this={ref} {onbeforeinput}> -->
	<div class="svedit-canvas {css_class}">
		<Block block={sveditSession.rootBlock} />
	</div>
</div>
