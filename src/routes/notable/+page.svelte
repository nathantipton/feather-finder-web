<script lang="ts">
	import NotableSpeciesMap from '$lib/components/maps/NotableSpeciesMap.svelte';
</script>

<svelte:head>
	<title>Nearby Notable Species | Feather Finder</title>
	<meta name="description" content="Notable species observations near you" />
</svelte:head>

<div class="flex flex-col w-full items-stretch justify-start relative">
	<div class="p-4">
		<h2>Nearby Notable Species</h2>
	</div>
	<NotableSpeciesMap />
</div>
