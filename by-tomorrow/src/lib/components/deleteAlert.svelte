<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index'
	import { Button } from '$lib/components/ui/button'
	import { SquareX } from 'lucide-svelte'

	let { onDelete } = $props()
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button
			variant="ghost"
			size="icon"
			class="absolute right-2 top-2 h-6 w-6 rounded-full hover:bg-destructive hover:text-destructive-foreground"
			><SquareX /></Button
		>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your snippet
				and it cannot be recovered.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={() => onDelete()}
				>Continue</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
