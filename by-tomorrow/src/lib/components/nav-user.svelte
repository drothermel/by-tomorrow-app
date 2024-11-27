<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index'
	import * as Sidebar from '$lib/components/ui/sidebar/index'

	let { user }: { user: { name: string; avatar: string } } = $props()
</script>
