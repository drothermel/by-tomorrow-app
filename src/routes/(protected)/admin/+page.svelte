<script lang="ts">
    import { UserButton } from 'svelte-clerk'
    let { data } : { data: any } = $props()
</script>

<div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Welcome to the Admin Page!</h1>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-4">
        <UserButton />
        <p class="text-xl font-semibold">User State</p>
        </div>

        <pre class="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
</div>