<script lang="ts">
  import type { ActionData} from "./types.ts";
  import type { ArxivQuery, ArxivMetadata } from "$lib/schemas"
  import { enhance } from '$app/forms';
  import { JsonView } from "@zerodevx/svelte-json-view";

  import * as Select from "$lib/components/ui/select/index.js";
  import { Button } from "$lib/components/ui/button/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index.js";

  let { form } : { form: ActionData} = $props();
  const sortByOpts = [
    { value: "relevance", label: "Relevance" },
    { value: "lastUpdatedDate", label: "Last Updated" },
    { value: "submittedDate", label: "Submitted Date" },
  ]
  let sortBySelected = $state(form?.query?.sortBy ?? "");
  let sortByText = $derived(
    sortByOpts.find((f) => f.value === sortBySelected)?.label ?? "Select an order"
  );


  let resultFeed = $derived(form?.data ?? []);
  let history: ArxivQuery[] = $state([]);
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
          <div class="w-full sm:w-5/6 xl:w-2/3 justify-center mx-auto">
            <form method="POST" use:enhance={() => ({ update }) => update({ reset: false })}>
              <div class="grid grid-cols-2 gap-2 p-4">
                  <Label for="queryAuthor">Author</Label>
                  <Input
                      id="queryAuthor"
                      name="queryAuthor"
                      type="text"
                      value={form?.query?.author ?? "Kyunghyun Cho"}
                      />
                  <Label for="queryTitle">Title</Label>
                  <Input
                      id="queryTitle"
                      name="queryTitle"
                      type="text"
                      value={form?.query?.title ?? ""}
                      />
                  <Label for="queryId">Article IDs</Label>
                  <Input
                      id="queryId"
                      name="queryId"
                      type="text"
                      value={form?.query?.ids ?? ""}
                      />
              </div>
              <div class="flex flex-row gap-2 p-4 justify-center mx-auto">
                <Label>Max Results:
                <Input
                  id="maxResults"
                  name="maxResults"
                  type="number"
                  value={form?.query?.maxResults ?? 2}
                />
                </Label>
                <Label>
                  Sort By:
                <Select.Root type="single" name="sortBy" bind:value={sortBySelected}>
                  <Select.Trigger class="w-[180px]">{sortByText}</Select.Trigger>
                  <Select.Content>
                    <Select.Item value="relevance">Relevance</Select.Item>
                    <Select.Item value="lastUpdatedDate">Last Updated</Select.Item>
                    <Select.Item value="submittedDate">Submitted Date</Select.Item>
                  </Select.Content>
                </Select.Root>
                </Label>
              </div>
              <Button type="submit">
                  Query Arxiv API
              </Button>
            </form>

          </div>


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
