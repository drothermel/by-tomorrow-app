<script lang="ts">
  import * as Table from '$lib/components/ui/table/index';
  import { Badge } from '$lib/components/ui/badge/index';
  import { Checkbox } from '$lib/components/ui/checkbox/index';
  import { Label } from '$lib/components/ui/label/index.js';
  import Input from '$lib/components/ui/input/input.svelte';
  import logger from '$lib/logger';

  export type TableData = {
    id: string;
    data: string[];
  };

  interface Props {
    headers: string[];
    data: TableData[];
    onRowsSelected: (selectedIds: string[]) => void;
  }
  let { headers, data, onRowsSelected }: Props = $props();

  function sortByDateDescending(data: TableData[], index: number): TableData[] {
    return data.sort((a, b) => {
      const dateA = new Date(a.data[index]);
      const dateB = new Date(b.data[index]);
      return dateB.getTime() - dateA.getTime(); // Most recent to oldest
    });
  }

  let visibleHeaders: string[] = $derived(headers);
  let allIds: string[] = $derived(data.map((row) => row.id));
  let selectedRows: string[] = $state([]);

  function isSelected(id: string): boolean {
    return selectedRows.includes(id);
  }
  function isAllSelected(): boolean {
    return selectedRows.length === allIds.length;
  }

  function toggleRowSelected(id: string): void {
    logger.log('Selected toggle: ', id);
    if (isSelected(id)) {
      selectedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      selectedRows = [...selectedRows, id];
    }
    onRowsSelected(selectedRows);
  }
  function toggleAllSelection(): void {
    if (isAllSelected()) {
      selectedRows = [];
    } else {
      selectedRows = allIds;
    }
    onRowsSelected(selectedRows);
  }

  let includedTags: string = $state('');
  let tagsList = $derived(
    includedTags === '' ? [] : includedTags.split(',').map((tag) => tag.trim())
  );
  let tagsIndex = $derived(
    headers.findIndex((header) => header.toLowerCase().includes('tags'))
  );
  let publishedIndex = $derived(
    headers.findIndex((header) => header.toLowerCase().includes('published'))
  );
  let filteredData = $derived(
    sortByDateDescending(
      data.filter((row) => {
        if (!row.data[tagsIndex]) {
          return true;
        }
        let rowTags = JSON.parse(row.data[tagsIndex]);
        return tagsList.every((tag) => rowTags.includes(tag));
      }),
      publishedIndex
    )
  );

  $effect(() => {
    logger.log('Selected:', $state.snapshot(selectedRows));
    console.log($state.snapshot(includedTags));
    console.log($state.snapshot(filteredData));
  });
</script>

<Label for="tagFilter" class="font-semibold">
  Tag Filter
  <Input
    id="tagFilter"
    bind:value={includedTags}
    placeholder="Tags to Include"
    class="w-full mb-4 mt-2"
  ></Input>
</Label>

<div class="w-full flex flex-col">
  <Table.Root>
    <Table.Header>
      <Table.Row class="bg-slate-50">
        <Table.Head>
          <Checkbox
            checked={isAllSelected()}
            onCheckedChange={(checked) => {
              toggleAllSelection();
            }}
          />
        </Table.Head>
        {#each visibleHeaders as header}
          <Table.Head class="text-sm tracking-tight text-balance">
            {header}
          </Table.Head>
        {/each}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each filteredData as row}
        <Table.Row>
          <Table.Cell>
            <Checkbox
              checked={isSelected(row.id)}
              onCheckedChange={(checked) => {
                toggleRowSelected(row.id);
              }}
            />
          </Table.Cell>
          {#each row.data as cell, index}
            {#if headers[index].toLowerCase().includes('tags')}
              <Table.Cell class="flex flex-wrap gap-1">
                {#each JSON.parse(cell) as tag}
                  <Badge variant="secondary">{tag}</Badge>
                {/each}
              </Table.Cell>
            {:else if headers[index].toLowerCase().includes('link')}
              <Table.Cell>
                <a href={cell}>{cell}</a>
              </Table.Cell>
            {:else}
              <Table.Cell>{cell}</Table.Cell>
            {/if}
          {/each}
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
