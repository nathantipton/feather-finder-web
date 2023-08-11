<script lang="ts">
	import { page } from '$app/stores';
	import SpeciesObservationsMap from '$lib/components/maps/SpeciesObservationsMap.svelte';
	export let data;

	$: ({ speciesDetails } = data);
	$: ({ speciesCode } = $page.params);
</script>

<svelte:head>
	<title>{speciesDetails.comName} | Feather Finder</title>
	<meta name="description" content={`Observations of ${speciesDetails.comName}`} />
</svelte:head>

<div class="flex flex-col w-full items-stretch justify-start">
	<div
		class="px-4 py-2 w-full flex flex-col md:flex-row items-baseline justify-start md:gap-4 border-b border-base-300"
	>
		<h4>{speciesDetails.comName}</h4>
		<p>{speciesDetails.familyComName}</p>
	</div>
	<SpeciesObservationsMap {speciesCode} />
</div>
