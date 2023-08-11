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
	<div class="px-4 py-2 w-full flex flex-row items-baseline justify-start gap-4">
		<h2>{speciesDetails.comName}</h2>
		<h6>{speciesDetails.familyComName}</h6>
	</div>
	<SpeciesObservationsMap {speciesCode} />
</div>
