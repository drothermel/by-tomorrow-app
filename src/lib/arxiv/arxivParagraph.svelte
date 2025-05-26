<script lang="ts">
  import * as Popover from '$lib/components/ui/popover/index.js';

  import type { Paragraph, BibItem } from '$lib/arxiv/arxivHtml.svelte';
  import ArxivSectionHeaders from '$lib/arxiv/arxivSectionHeaders.svelte';

  let {
    paragraph,
    bib,
    view
  }: { paragraph: Paragraph; bib: BibItem[]; view: { badgeView: boolean } } =
    $props();
</script>

{#if view.badgeView}
  <div class="flex flex-col bg-white border border-indigo-300 rounded-lg p-2">
    <ArxivSectionHeaders title={paragraph.title} {view} />
    <span>
      {#each paragraph.contents as content}
        {#if content.type === 'text'}
          <span
            class="border border-rose-200 bg-rose-50 rounded-lg p-1 text-xs"
          >
            {content.text}
          </span>
        {:else if content.type === 'math'}
          <span
            class="border border-emerald-300 bg-emerald-50 rounded-lg p-1 text-xs mx-1"
          >
            {@html content.html}
          </span>
        {:else if content.type === 'citation'}
          <Popover.Root>
            <Popover.Trigger>
              <span
                class="border border-indigo-200 bg-indigo-50 rounded-lg p-1 text-xs mx-1"
              >
                [{content.citeNum}]
              </span>
            </Popover.Trigger>
            <Popover.Content>
              <span>
                <span class="font-semibold">Citation {content.citeStr}:</span>
                {bib[content.citeNum].bibString}
              </span>
            </Popover.Content>
          </Popover.Root>
        {:else if content.type === 'sectionLink'}
          <span
            class="border border-orange-500 bg-orange-50 rounded-lg p-1 text-xs mx-1"
          >
            {content.sectionNum}
            <!-- <span class="text-slate-400">({content.title})</span> -->
          </span>
        {:else}
          <div class="prose-sm">
            <pre>{JSON.stringify(content)}</pre>
          </div>
        {/if}
      {/each}
    </span>
  </div>
{:else}
  <div class="prose-sm p-2">
    <ArxivSectionHeaders title={paragraph.title} {view} />
    {@html paragraph.html}
  </div>
{/if}
