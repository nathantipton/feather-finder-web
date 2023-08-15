<script lang="ts">
	import { page } from '$app/stores';
	import SpeciesObservationsMap from '$lib/components/maps/SpeciesObservationsMap.svelte';
	import { updateSEOData } from '$lib/stores/seo.store';
	export let data;

	$: ({ speciesDetails } = data);
	$: ({ speciesCode } = $page.params);

	$: if (speciesDetails) {
		updateSEOData({
			title: `${speciesDetails.comName}`,
			description: `Check out this map of ${speciesDetails.comName} sightings!`,
			url: $page.url.toString()
		});
	}
</script>

<div class="flex flex-col w-full items-stretch justify-start">
	<div
		class="p-4 w-full flex flex-col md:flex-row items-baseline justify-start md:gap-4 border-b border-base-300"
	>
		<h4>{speciesDetails.comName}</h4>
		<p>{speciesDetails.familyComName}</p>
	</div>
	<SpeciesObservationsMap {speciesCode} />
</div>
