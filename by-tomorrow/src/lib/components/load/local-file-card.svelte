<script lang="ts">
	import { Button } from '$lib/components/ui/button/index'
	import * as Card from '$lib/components/ui/card/index'
	import { Description } from '../ui/dialog'
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Local File</Card.Title>
		<Card.Description>
			<p>Choose a local file to upload to your library.</p>
			<p class="italic">Accepted formats: pdf.</p>
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<input type="file" class="hidden" />
		<Button size="sm" variant="outline">Select File</Button>
	</Card.Content>
	<Card.Footer>
		<Button>Upload</Button>
	</Card.Footer>
</Card.Root>
