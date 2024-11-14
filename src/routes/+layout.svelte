<script lang="ts">
	import { page } from '$app/stores'
	import { handleSession } from '@lucia-auth/sveltekit/client'
	import Heading from './heading.svelte'
	import Footer from './footer.svelte'

	import '../app.postcss'
	import '../app.css'

	handleSession(page)
</script>

<svelte:head>
	<title>Blog</title>
	<link rel="icon" href="https://fav.farm/🔥" />
</svelte:head>

<Heading />
<slot />
<Footer />
