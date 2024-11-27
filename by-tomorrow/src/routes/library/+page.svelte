<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte'
	import Label from '$lib/components/ui/label/label.svelte'
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-4">
		<div>
			<!-- leading-tight lg:leading-[1.1] -->
			<h2 class="text-2xl font-bold tracking-tight text-balance">
				Source Library
			</h2>

			<DataTable />
		</div>
	</div>
</div>
