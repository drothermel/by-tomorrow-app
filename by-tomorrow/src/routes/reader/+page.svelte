<script lang="ts">
  import ArxivSection from '$lib/arxiv/arxivSection.svelte';
  import { parsePaperData } from '$lib/arxiv/arxivHtml.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';

  let { data }: { data: any } = $props();
  let paperURL = $state({ value: '' });
  let paperDataStr = $state(data.html);

  async function fetchExample() {
    const formData = new FormData();
    formData.append('url', paperURL.value);
    const response = await fetch('/reader?/testFile', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const responseData = await response.json();
      const [indices, success, pageData] = JSON.parse(responseData.data);
      if (success) {
        paperDataStr = pageData;
      }
    } else {
      console.error('It failed');
    }
  }

  async function queryPage() {
    const formData = new FormData();
    formData.append('url', paperURL.value);
    const response = await fetch('/reader?/query', {
      method: 'POST',
      body: formData
    });
    console.log(response);

    if (response.ok) {
      const responseData = await response.json();
      const [indices, success, pageDataText] = JSON.parse(responseData.data);
      if (success) {
        paperDataStr = pageDataText;
        console.log(pageDataText);
      }
    }
  }
  const paperData = $derived(paperDataStr ? JSON.parse(paperDataStr) : {});
</script>

<div class="container items-center justify-center mx-auto p-4 w-full">
  <div class="flex flex-row justify-between gap-2 mb-2">
    <Input bind:value={paperURL.value} placeholder="Search Paper Arxiv URL" />
    <Button
      onclick={() => {
        queryPage();
      }}>Query Paper</Button
    >
    <Button
      onclick={() => {
        fetchExample();
      }}>Test Paper</Button
    >
  </div>
  {#if paperDataStr}
    <div class="prose flex flex-col gap-2 p-4 max-w-6xl mx-auto">
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
