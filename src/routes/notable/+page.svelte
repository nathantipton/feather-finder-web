<script lang="ts">
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import NotableSpeciesMap from '$lib/components/maps/NotableSpeciesMap.svelte';
</script>

<svelte:head>
	<SEO title="Nearby Notable Species" description="Notable species observations near you" />
</svelte:head>

<div class="flex flex-col w-full items-stretch justify-start relative">
	<div class="p-4">
		<h4>Nearby Notable Species</h4>
	</div>
	<NotableSpeciesMap />
</div>
