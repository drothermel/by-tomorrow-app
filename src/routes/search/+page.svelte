<script lang="ts">
	import type { ActionData } from './types.ts'
	import type { ArxivQuery, ArxivMetadataList } from '$lib/schemas'
	import { enhance } from '$app/forms'

	import * as Select from '$lib/components/ui/select/index.js'
	import { Button } from '$lib/components/ui/button/index'
	import { Input } from '$lib/components/ui/input/index'
	import { Label } from '$lib/components/ui/label/index.js'

	import CardLibrary from '$lib/components/search/cardLibrary.svelte'

	let { data, form }: { data: any; form: ActionData } = $props()
	const startIds = $state(data.arxivIds)
	const sortByOpts = [
		{ value: 'relevance', label: 'Relevance' },
		{ value: 'lastUpdatedDate', label: 'Last Updated' },
		{ value: 'submittedDate', label: 'Submitted Date' },
	]
	let sortBySelected = $state(form?.query?.sortBy ?? '')
	let sortByText = $derived(
		sortByOpts.find((f) => f.value === sortBySelected)?.label ??
			'Select an order'
	)

	let resultFeed: ArxivMetadataList = $derived(form?.data ?? [])
	let history: ArxivQuery[] = $state([])
</script>

<div class="flex h-full flex-1 flex-col items-center px-4">
	<div
		class="flex flex-col w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:3/5 justify-between space-y-2 gap-4"
	>
		<!-- Heading -->
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-balance">
				Arxiv Search
			</h2>
			<div class="flex flex-row justify-between gap-4">
				<p class="text-muted-foreground">
					Query the Arxiv API to find interesting papers. Query fields are
					exact-match only.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<!-- Query Form -->
			<div class="w-full sm:w-5/6 xl:w-2/3 justify-center mx-auto">
				<form
					action="?/query"
					method="POST"
					use:enhance={() =>
						({ update }) =>
							update({ reset: false })}
				>
					<div class="grid grid-cols-6 gap-x-2 gap-y-4 p-2 items-center">
						<Label class="col-span-1" for="queryAuthor">Author</Label>
						<Input
							class="col-span-5"
							id="queryAuthor"
							name="queryAuthor"
							type="text"
							value={form?.query?.author ?? 'Kyunghyun Cho'}
						/>
						<Label class="col-span-1" for="queryTitle">Title</Label>
						<Input
							class="col-span-5"
							id="queryTitle"
							name="queryTitle"
							type="text"
							value={form?.query?.title ?? ''}
						/>
						<Label class="col-span-1" for="queryId">Article IDs</Label>
						<Input
							class="col-span-5"
							id="queryId"
							name="queryId"
							type="text"
							value={form?.query?.ids ?? ''}
						/>
					</div>
					<div class="flex flex-row gap-2 p-4 justify-center mx-auto">
						<Label
							>Max Results:
							<Input
								id="maxResults"
								name="maxResults"
								type="number"
								value={form?.query?.maxResults ?? 10}
							/>
						</Label>
						<Label>
							Sort By:
							<Select.Root
								type="single"
								name="sortBy"
								bind:value={sortBySelected}
							>
								<Select.Trigger class="w-[180px]">{sortByText}</Select.Trigger>
								<Select.Content>
									<Select.Item value="relevance">Relevance</Select.Item>
									<Select.Item value="lastUpdatedDate">Last Updated</Select.Item
									>
									<Select.Item value="submittedDate">Submitted Date</Select.Item
									>
								</Select.Content>
							</Select.Root>
						</Label>
					</div>
					<Button type="submit">Query Arxiv API</Button>
				</form>
			</div>

			<!-- Card Library -->
			<CardLibrary
				data={resultFeed}
				query={form?.query}
				libraryInit={data.arxivIds}
			/>
		</div>
	</div>
</div>
