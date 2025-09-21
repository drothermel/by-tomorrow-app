<script lang="ts">

	import { onMount } from 'svelte';

	import { Button } from '$lib/components/ui/button/index'
	import type { Snippet } from 'svelte'
	import { useClerkContext, SignedIn, SignedOut, UserButton, SignInButton } from 'svelte-clerk'

	import { ClerkProvider } from 'svelte-clerk'
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index'
	import { Separator } from '$lib/components/ui/separator/index'
	import * as Sidebar from '$lib/components/ui/sidebar/index'
	import AppSidebar from '$lib/components/app-sidebar.svelte'
	import { page } from '$app/stores'
	import '../app.css'

	const { children }: {children: Snippet } = $props()

	function convertToTitleCase(input: any): string {
		if (!input) {
			return ''
		}
		return input.toLowerCase().replace('_', ' ').replace(
			/\b\w/g, (s: string) => s.toUpperCase()
		)
	}

	function getBreadcrumbName() {
		if ($page.url.pathname === '/') {
			return 'Home'
		}
		return convertToTitleCase($page.url.pathname.split('/').pop())
	}

	function handleSignInButton() {
		if ((window as any).Clerk) {
			(window as any).Clerk.openSignIn({})
		} else {
			window.location.href = '/sign-in'
		}
	}

</script>

<ClerkProvider>
	<Sidebar.Provider>
		<AppSidebar />
		<Sidebar.Inset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="/">ByTomorrow</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Link href={$page.url.pathname}>
								{getBreadcrumbName()}
							</Breadcrumb.Link>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<div class="ml-auto flex items-center gap-2">
					<SignedOut>
						<SignInButton asChild>
							<Button variant="outline" size="sm" onclick={handleSignInButton}>
								Sign In
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</header>
			<div class="bg-background relative flex min-h-screen flex-col p-4">
					{@render children?.()}
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
</ClerkProvider>
