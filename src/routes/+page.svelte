<script lang="ts">
	import { SignedIn, SignedOut, SignUpButton } from 'svelte-clerk'
	import { Button } from '$lib/components/ui/button/index'
	function handleSignUpButton() {
		if ((window as any).Clerk) {
			(window as any).Clerk.openSignUp({})
		} else {
			window.location.href = '/sign-in'
		}
	}
</script>

<div class="flex flex-col mx-auto px-4 py-4 sm:px-6 lg:px-20">
	<!--Header-->
	<div class="flex flex-col mx-auto p-6">
		<h1 class="text-center text-4xl font-bold">By Tomorrow</h1>
		<h4 class="mx-auto text-center py-4 px-8 sm:px-10 lg:px-20">
			Quickly manage your research sources, thoughts, data, plotting and docs.
		</h4>
	</div>

	<!--Descriptions-->
	<div class="flex flex-col mx-auto px-4 sm:px-6 lg:px-10">

		<!--Mode Options-->
		<div class="flex flex-col mx-auto gap-y-4 gap-x-8 px-4 sm:px-6 lg:px-8">
			<div class="grid gird-cols-1 md:grid-cols-3 gap-10 items-center pb-4">
				<Button class="text-md font-semibold" href="/search">Search</Button>
				<p class="text-md md:col-span-2">
					<strong>Paper Search</strong>: Start by searching arxiv for papers to save.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
				<Button class="text-md font-semibold" href="/reader">Reader</Button>
				<p class="text-md md:col-span-2">
					<strong>Paper Reader</strong>: Then enter a focused reading mode to explore the chosen papers.
				</p>
			</div>
			<SignedOut>
				<div class="grid grid-cols-1 items-center text-center pt-4">
					Library Browser, Data Visualizer and Note Editor are also available with an account!
				</div>
				<div class="grid grid-cols-1 items-center mx-auto">
					<SignUpButton asChild>
						<Button class="text-md font-semibold" onclick={handleSignUpButton}>
							Sign Up
						</Button>
					</SignUpButton>
				</div>
			</SignedOut>
			<SignedIn>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
					<Button class="text-md font-semibold" href="/library" disabled>
						Library
					</Button>
					<p class="text-md md:col-span-2">
						<strong>Library Browser</strong>: Sort through your source documents,
						thought/note snippets, and produced compound documents.
					</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
					<Button class="text-md font-semibold" href="/data_viz">
						Data Viz
					</Button>
					<p class="text-md md:col-span-2">
						<strong>Data Viz</strong>: Visualize your own experimental data in a variety of ways.
					</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
					<Button class="text-md font-semibold" href="/editor">
						Editor
					</Button>
					<p class="text-md md:col-span-2">
						<strong>Note Editor</strong>: Combine your source documents, experimental results, thought
						snippets, and new ideas with a drag-and-drop doc creation editor.
					</p>
				</div>
			</SignedIn>
		</div>
	</div>
</div>
