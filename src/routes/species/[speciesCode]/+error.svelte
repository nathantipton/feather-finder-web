<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="w-full flex flex-col justify-center items-center text-center gap-4">
	{#if $page.status === 404}
		<h1 class="text-xl font-bold">Oops!</h1>
		<p class="text-gray-600">This bird species was not found.</p>
		<a href="/" class="btn btn-primary">Go back home</a>
	{:else}
		<h1 class="text-2xl font-bold">Error</h1>
		<p class="text-gray-600">Something went wrong. Please try again later.</p>
		<a href="/" class="btn btn-primary">Go back home</a>
	{/if}
</div>
