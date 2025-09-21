<script>
	import { SignedIn, SignedOut } from 'svelte-clerk'
	import {
		House,
		Search,
		Library,
		SquareChartGantt,
		PencilRuler,
		ChartBar,
	} from 'lucide-svelte'

	import * as Sidebar from '$lib/components/ui/sidebar/index'


	const public_nav_items = [
		{
			title: 'Home',
			url: '/',
			icon: House,
		},
		{
			title: 'Search',
			url: '/search',
			icon: Search,
		},
		{
			title: 'Reader',
			url: '/reader',
			icon: SquareChartGantt,
		},
	]
	const protected_nav_items = [
		{
			title: 'Home',
			url: '/',
			icon: House,
		},
		{
			title: 'Data Viz',
			url: '/data_viz',
			icon: ChartBar,
		},
		{
			title: 'Library',
			url: '/library',
			icon: Library,
		},
		{
			title: 'Editor',
			url: '/editor',
			icon: PencilRuler,
		},
		{
			title: 'Search',
			url: '/search',
			icon: Search,
		},
		{
			title: 'Reader',
			url: '/reader',
			icon: SquareChartGantt,
		},
	]
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>ByTomorrow App</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<SignedIn>
					<Sidebar.Menu>
						{#each protected_nav_items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</SignedIn>
				<SignedOut>
					<Sidebar.Menu>
						{#each public_nav_items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</SignedOut>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
