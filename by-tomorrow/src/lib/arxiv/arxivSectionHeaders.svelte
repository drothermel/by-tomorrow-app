<script lang="ts">
  import { titleCase } from 'title-case';
  import type { Title } from '$lib/arxiv/arxivHtml.svelte';
  let { title, view }: { title?: Title; view: { badgeView: boolean } } =
    $props();

  const titleStyling = $derived({
    'my-0': true,
    'rounded-lg bg-white border border-violet-200 p-2': view.badgeView,
    'px-2': !view.badgeView,
    cls: 'true',
    'text-sm text-slate-600':
      title &&
      !(
        title?.classNames.includes('ltx_title_section') ||
        title?.classNames.includes('ltx_title_subsection') ||
        title?.classNames.includes('ltx_title_subsubsection')
      ),
    'text-xl text-slate-950': title?.classNames.includes('ltx_title_section'),
    'text-lg text-slate-800': title?.classNames.includes(
      'ltx_title_subsection'
    ),
    'text-base text-slate-700': title?.classNames.includes(
      'ltx_title_subsubsection'
    )
  });
</script>

{#if title}
  <h2 class={titleStyling}>
    {#if title?.text && title?.section}
      {title?.section + ' | ' + titleCase(title?.text || '')}
    {:else if title?.text}
      {titleCase(title?.text || '')}
    {/if}
  </h2>
{/if}
