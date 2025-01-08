<script lang="ts">
  import ArxivSection from '$lib/arxiv/arxivSection.svelte';
  import { parsePaperData } from '$lib/arxiv/arxivHtml.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';

  let { data }: { data: any } = $props();
  const htmlText = data.html;
  const paperData = parsePaperData(htmlText);
  console.log(paperData);
  // const ch = cheerio.load(htmlText)
  // const article = ch('article').html()
</script>

<div class="container items-center justify-center mx-auto p-4 w-full">
  {#if data}
    <div class="prose flex flex-col gap-2 p-4 max-w-3xl mx-auto">
      <h1 class="my-2">{paperData.title}</h1>
      <p class="font-semibold text-sm my-2">{paperData.authors.join(', ')}</p>
      <p class="text-tighter text-sm my-2">{paperData.abstract}</p>
      <p class="text-tighter text-sm my-2">
        <span class="font-bold">Keywords:</span>{' ' +
          paperData.keywords.join(', ')}j
      </p>
      <Separator />
      <div>
        <ArxivSection
          section={paperData.content}
          bib={paperData.bibliography}
        />
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
