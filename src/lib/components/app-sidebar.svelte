<script>
	import {
		House,
		Search,
		Library,
		SquareChartGantt,
		PencilRuler,
		CloudUpload,
	} from 'lucide-svelte'

	import * as Sidebar from '$lib/components/ui/sidebar/index'
	// import * as Avatar from '$lib/components/ui/avatar/index'

	const user_data = {
		name: 'Default User',
		avatar: '/static/favicon.png',
	}

	const menu_items = [
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
			title: 'Library',
			url: '/library',
			icon: Library,
		},
		{
			title: 'Reader',
			url: '/reader',
			icon: SquareChartGantt,
		},
		{
			title: 'Editor',
			url: '/editor',
			icon: PencilRuler,
		},
	]
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>ByTomorrow App</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each menu_items as item (item.title)}
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
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<!-- <Sidebar.Footer>
		<Avatar.Root class="h-8 w-8 rounded-lg">
			<Avatar.Image src={user_data.avatar} alt={user_data.name} />
			<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="grid flex-1 text-left text-sm leading-tight">
			<span class="truncate font-semibold">{user_data.name}</span>
		</div>
	</Sidebar.Footer> -->
</Sidebar.Root>
