<script lang="ts">
	import { goto } from '$app/navigation';
	import { AlgoliaSearchClient } from '$lib/algolia.js';
	import SEO from '$lib/components/SEO.svelte';
	import type { SpeciesRecord } from '$lib/models/ebird.js';

	export let data;
	$: ({ results } = data);
	$: queryID = results.queryID;

	function handleSelection(record: SpeciesRecord, position: number) {
		if (!queryID) return;
		AlgoliaSearchClient.objectClickedAfterSearch(queryID, record.speciesCode, position);
		goto(`/species/${record.speciesCode}`);
	}
</script>

<SEO title={`Results for "${results.query}"`} description={`Results for "${results.query}"`} />

<div class="px-4 w-full">
	<div class="flex flex-row justify-between items-baseline">
		<h4>Results for "{results.query}"</h4>
		<p>Found {results.nbHits} species in {results.processingTimeMS}ms</p>
	</div>
	<div class="divider" />
	<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
		{#each results.hits as result, index}
			<a
				href={`/species/${result.speciesCode}`}
				class="p-4 rounded bg-base-200 border border-base-300 hover:bg-base-300"
				on:click={() => handleSelection(result, index + 1)}
			>
				<h4>{result.comName}</h4>
				<h6>{result.familyComName}</h6>
				<p>{result.sciName}</p>
			</a>
		{/each}
	</div>
</div>
