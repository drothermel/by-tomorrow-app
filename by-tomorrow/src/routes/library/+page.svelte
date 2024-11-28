<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte'
	import Label from '$lib/components/ui/label/label.svelte'
</script>

<div class="hidden h-full flex-1 flex-col px-4 md:flex">
	<div class="flex flex-col items-center justify-between space-y-2 gap-4">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-balance">
				Source Library
			</h2>
			<p class="text-muted-foreground">
				Upload and explore source documents (eg. pdfs, blogposts). Then select
				some to annotate in the reader.
			</p>
		</div>
		<DataTable />
	</div>
</div>
