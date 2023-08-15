<script lang="ts">
	import { page } from '$app/stores';
	import SpeciesObservationsMap from '$lib/components/maps/SpeciesObservationsMap.svelte';
	export let data;

	$: ({ speciesDetails } = data);
	$: ({ speciesCode } = $page.params);

	$: console.log('page', speciesCode);
</script>

<svelte:head>
	<!-- <SEO
		title={speciesDetails.comName}
		description={`Check out this map of ${speciesDetails.comName} sightings!`}
	/> -->
	<title>{speciesDetails.comName} | Feather Finder</title>

	<meta property="og:title" content={`${speciesDetails.comName} | Feather Finder`} />
	<meta
		property="og:description"
		content={`Check out this map of ${speciesDetails.comName} sightings!`}
	/>
	<meta property="og:image" content="https://feather-finder.com/og_image_banner.png" />
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={`${speciesDetails.comName} | Feather Finder`} />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${speciesDetails.comName} | Feather Finder`} />
	<meta
		name="twitter:description"
		content={`Check out this map of ${speciesDetails.comName} sightings!`}
	/>
	<meta name="twitter:image" content="https://feather-finder.com/og_image_banner.png" />
</svelte:head>

<div class="flex flex-col w-full items-stretch justify-start">
	<div
		class="p-4 w-full flex flex-col md:flex-row items-baseline justify-start md:gap-4 border-b border-base-300"
	>
		<h4>{speciesDetails.comName}</h4>
		<p>{speciesDetails.familyComName}</p>
	</div>
	<SpeciesObservationsMap {speciesCode} />
</div>
