<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte'
	import Label from '$lib/components/ui/label/label.svelte'
	import FileLoadDialog from '$lib/components/file-load-dialog.svelte'
</script>

<div class="flex h-full flex-1 flex-col items-center px-4">
	<div
		class="flex flex-col w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:3/5 justify-between space-y-2 gap-4"
	>
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-balance">
				Source Library
			</h2>
			<p class="text-muted-foreground">
				Upload and explore source documents (eg. pdfs, blogposts). Then select
				some to annotate in the reader.
			</p>
			<FileLoadDialog />
		</div>
		<DataTable />
	</div>
</div>
