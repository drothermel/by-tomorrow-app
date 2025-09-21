<script lang="ts">
    import { SignedIn, SignedOut, UserButton, SignInButton } from 'svelte-clerk';
</script>

<div class="p-8">
    <SignedOut>
        <h1 class="text-2xl font-bold mb-6">Please sign in to access admin.</h1>
        <SignInButton />
    </SignedOut>
    <SignedIn>
        <h1 class="text-2xl font-bold mb-6">Welcome to Admin</h1>
        <UserButton />
    </SignedIn>

</div>