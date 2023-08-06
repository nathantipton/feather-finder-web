<script lang="ts">
	import { page } from '$app/stores';
	import SpeciesObservationsMap from '$lib/components/maps/SpeciesObservationsMap.svelte';

	const speciesCode = $page.params.speciesCode;
	export let data;

	const { speciesDetails } = data;
	console.log(speciesDetails);
</script>

<div class="flex flex-col w-full items-stretch justify-start">
	<div class="px-4 py-2 w-full">
		<h2>{speciesDetails.comName}</h2>
		<h6>{speciesDetails.familyComName}</h6>
	</div>
	<div class="relative flex-1">
		<SpeciesObservationsMap {speciesCode} />
	</div>
</div>
