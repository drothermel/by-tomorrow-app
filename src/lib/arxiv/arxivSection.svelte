<script lang="ts">
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Eye } from 'lucide-svelte';

  import ArxivSectionHeaders from '$lib/arxiv/arxivSectionHeaders.svelte';
  import ArxivParagraph from '$lib/arxiv/arxivParagraph.svelte';
  import ArxivSection from '$lib/arxiv/arxivSection.svelte';
  import type { BibItem, Section } from '$lib/arxiv/arxivHtml.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  let { section, bib }: { section: Section; bib: BibItem[] } = $props();
  let visibleArr: boolean[] = $state(Array(section.content.length).fill(true));
  let badgeView: boolean[] = $state(Array(section.content.length).fill(false));
  let headerView = $state({ badgeView: false, visible: true });

  function toggleVisibility(contentIdx: number) {
    visibleArr[contentIdx] = !visibleArr[contentIdx];
  }
  function allVisible() {
    visibleArr = Array(section.content.length).fill(true);
    headerView.visible = true;
  }
  function toggleBadgeView(contextIdx: number) {
    badgeView[contextIdx] = !badgeView[contextIdx];
  }
  function toggleHeaderVisibility() {
    headerView.visible = !headerView.visible;
  }
  function toggleHeaderBadgeView() {
    headerView.badgeView = !headerView.badgeView;
    console.log('Toggle header view');
  }
</script>

<div class="flex flex-row gap-1 p-0 w-full border border-slate-300 rounded-lg">
  <div class="flex flex-col gap-1 bg-slate-100 bg-opacity-30 p-1 my-2">
    {#if headerView.visible}
      <Popover.Root>
        <Popover.Trigger>
          <div class="justify-start text-start items-start">
            <ArxivSectionHeaders title={section.title} view={headerView} />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <div class="flex flex-row gap-2">
            <Button size="sm" onclick={() => toggleHeaderVisibility()}>
              Hide Header
            </Button>
            <Button size="sm" onclick={() => toggleHeaderBadgeView()}>
              Toggle Header Badge
            </Button>
          </div>
        </Popover.Content>
      </Popover.Root>
    {/if}
    {#each section.content as content, idx}
      {#if visibleArr[idx]}
        {#if content.type === 'section'}
          <Popover.Root>
            <Popover.Trigger>
              <div class="justify-start text-start items-start">
                <ArxivSection section={content} {bib} />
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <div class="flex flex-row gap-2">
                <Button size="sm" onclick={() => toggleVisibility(idx)}>
                  Hide Section
                </Button>
              </div>
            </Popover.Content>
          </Popover.Root>
        {:else if content.type === 'paragraph'}
          <!-- PARAGRAPH -->
          <Popover.Root>
            <Popover.Trigger>
              <div class="justify-start text-start text-pretty">
                <ArxivParagraph
                  paragraph={content}
                  {bib}
                  view={{ badgeView: badgeView[idx] }}
                />
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <div class="flex flex-row gap-2">
                <Button size="sm" onclick={() => toggleVisibility(idx)}>
                  Hide Paragraph
                </Button>
                <Button size="sm" onclick={() => toggleBadgeView(idx)}>
                  Toggle Badge View
                </Button>
              </div>
            </Popover.Content>
          </Popover.Root>
        {:else if content.type === 'figure'}
          <!-- FIGURE -->
          <Popover.Root>
            <Popover.Trigger>
              <div
                class="prose bg-indigo-50 border border-slate-300 p-2 m-2 rounded-lg"
              >
                {content.caption}
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <div class="items-center justify-center text-center">
                <Button onclick={() => toggleVisibility(idx)}
                  >Hide Figure</Button
                >
              </div>
            </Popover.Content>
          </Popover.Root>
        {:else if content.type === 'equation'}
          <!-- EQUATION -->
          <div class="items-center justify-center text-center w-full">
            <Popover.Root>
              <Popover.Trigger>
                <div
                  class="border border-teal-200 bg-white p-2 rounded-lg w-full"
                >
                  <div class="grid grid-col-1">
                    {@html content.html}
                  </div>
                </div>
              </Popover.Trigger>
              <Popover.Content class="w-auto max-w-xl">
                <div>
                  <span class="font-semibold">Latex:</span>
                  <div
                    class="items-center justify-center bg-slate-50 max-w-full p-2 rounded-lg text-pretty"
                  >
                    {content.latexStrings}
                  </div>
                </div>
                <Button onclick={() => toggleVisibility(idx)}>
                  Hide Equation
                </Button>
              </Popover.Content>
            </Popover.Root>
          </div>
        {:else}
          <!-- UNKNOWN -->
          <div>{@html content.html}</div>
        {/if}
      {/if}
    {/each}
  </div>
  <div class="max-w-0">
    <Button
      onclick={() => allVisible()}
      class="w-5 bg-green-50 h-5 relative top-0 right-9"
      variant="outline"><Eye /></Button
    >
  </div>
</div>
