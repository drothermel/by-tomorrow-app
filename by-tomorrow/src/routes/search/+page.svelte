<script lang="ts">
    import type { ArxivQuery, ArxivMetadata } from "$lib/schemas"
    import  { queryArxiv } from "$lib/components/arxiv.svelte";
    import { JsonView } from "@zerodevx/svelte-json-view";

    import { Button } from "$lib/components/ui/button/index";
    import { Input } from "$lib/components/ui/input/index";
    import { Label } from "$lib/components/ui/label/index.js";
    let query: ArxivQuery = $state({
        start: 0,
        maxResults: 2,
        sortBy: 'lastUpdatedDate',
        sortOrder: 'descending',
        author: 'Kyunghyun Cho',
        title: "",
        ids: "",
        joinType: "AND",
    });
    let history: ArxivQuery[] = $state([]);
    let resultFeed: ArxivMetadata = $state([]);
    function updateResultFeed(data: ArxivMetadata) {
        resultFeed = data;
    }
</script>

<div class="flex h-full flex-1 flex-col items-center px-4">
	<div
		class="flex flex-col w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:3/5 justify-between space-y-2 gap-4"
	>
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-balance">
				Arxiv Search
			</h2>
			<div class="flex flex-row justify-between gap-4">
				<p class="text-muted-foreground">
                    Query the Arxiv API to find interesting papers. Query fields are exact-match only.
				</p>
			</div>
		</div>
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-2">
              <Label for="maxRes">Max Results:</Label>
              <Input
                id="maxRes"
                type="number"
                bind:value={query.maxResults}
              />
                <Label for="query_author">Author</Label>
                <Input
                    id="query_author"
                    type="text"
                    bind:value={query.author}
                    placeholder="Author Name"
                    />
                <Label for="query_title">Title</Label>
                <Input
                    id="query_title"
                    type="text"
                    bind:value={query.title}
                    placeholder="Title"
                    />
                <Label for="query_id">Article IDs</Label>
                <Input
                    id="query_id"
                    type="text"
                    bind:value={query.ids}
                    placeholder="Article ID"
                    />

            </div>
            <Button onclick={() => queryArxiv(query, updateResultFeed)}>
                Query Arxiv API
            </Button>


            <Label for="results">Retrieved Arxiv Results:</Label>
            <div id="results">
              {#if resultFeed.length > 0}
                <div class="flex flex-col gap-4 w-full prose-sm p-4 bg-slate-50">
                  {#each resultFeed as entry}
                    <div class="flex flex-col p-4 gap-2 bg-slate-100">
                      <JsonView json={entry} />
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="p-4 prose-sm bg-slate-50">
                  <p>No Results to Show</p>
                </div>
              {/if}
            </div>
          </div>
	</div>
</div>
