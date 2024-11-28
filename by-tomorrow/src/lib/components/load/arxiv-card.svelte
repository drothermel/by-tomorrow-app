<script lang="ts">
	import * as Card from '$lib/components/ui/card/index'
	import { Button } from '$lib/components/ui/button/index'

	function handleUpload() {
		console.log('Upload arxiv!')
	}
</script>

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
		<Button onclick={handleUpload}>Upload</Button>
	</Card.Footer>
</Card.Root>
