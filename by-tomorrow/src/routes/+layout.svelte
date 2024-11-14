<script lang="ts">
	import '../app.css'
	let { children } = $props()
</script>

<nav class="bg-gray-800 p-4">
	<div class="max-w-7xl mx-auto flex space-x-4">
		<a href="/" class="text-white hover:text-gray-300">Home</a>
		<a href="/about" class="text-white hover:text-gray-300">About</a>
	</div>
</nav>

{@render children()}
