<script lang="ts">
	import { Button } from '$lib/components/ui/button/index'
</script>

<div class="container flex flex-col mx-auto px-4 py-4 sm:px-6 lg:px-20">
	<!--Header-->
	<div class="flex flex-col mx-auto p-6">
		<h1 class="text-center">By Tomorrow</h1>
		<h4 class="mx-auto text-center py-4 px-8 sm:px-10 lg:px-20">
			Quickly manage your research sources, thoughts and docs.
		</h4>
	</div>

	<!--Descriptions-->
	<div class="flex flex-col mx-auto px-4 sm:px-6 lg:px-10">
		<h2 class="text-left border-b-0 font-semibold px-4 mb-0">Features:</h2>
		<!--Mode Options-->
		<div class="flex flex-col mx-auto gap-y-4 gap-x-8 px-4 sm:px-6 lg:px-8">
			<!-- Library Mode-->
			<div class="grid gird-cols-1 md:grid-cols-3 gap-4 items-center">
				<Button href="/library">Library</Button>
				<p class="text-m md:col-span-2">
					<strong>Library Mode</strong>: Sort through your source documents,
					thought/note snippets, and produced compound documents.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
				<Button href="/preview">Preview</Button>
				<p class="text-base md:col-span-2">
					<strong>Preview Mode</strong>: After selecting a subset of documents
					to preview in library mode, enter a focused reading mode to explore
					the documents and add per-document annotations.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
				<Button href="/editor">Editor</Button>
				<p class="text-base md:col-span-2">
					<strong>Editor Mode</strong>: Combine your source documents, thought
					snippets, and new ideas with a drag-and-drop doc creation editor.
				</p>
			</div>
		</div>
	</div>

	<!--Create Account-->
	<div class="flex flex-col mt-5 py-8 items-center gap-4 px-4">
		<h3 class="text-lg mx-auto">
			Create an account and add some source documents to get started!
		</h3>
		<Button href="/login">Create Account</Button>
	</div>
</div>
