<script lang="ts">
	import '../app.css'
	let { children } = $props()
</script>

{@render children()}

<!--Footer -->

<footer class="fixed inset-x-0 bottom-0 bg-gray-800 text-white py-4">
	<div class="max-w-4xl mx-auto flex justify-end space-x-4 px-4">
		<span class="text-lg font-semibold">By Tomorrow</span>
		<a
			href="https://github.com/drothermel/by-tomorrow-app"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:text-gray-400"
		>
			<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
				<path
					d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.17c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.62-5.475 5.92.43.37.823 1.096.823 2.21v3.285c0 .32.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
				/>
			</svg>
			<span class="sr-only">GitHub</span>
		</a>
	</div>
</footer>
