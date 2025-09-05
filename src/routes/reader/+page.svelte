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

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">PDF Viewer</h1>
	<div class="flex flex-row gap-2">
		<Label for="pdfurl">PDF Link:</Label>
		<Input bind:value={pdfUrl} id="pdfurl" placeholder="Enter link to pdf" />
	</div>
       <iframe src={pdfUrl} class="pdf-container min-h-screen" title="PDF"></iframe>
</div>
