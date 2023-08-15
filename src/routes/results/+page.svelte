<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AlgoliaSearchClient } from '$lib/algolia.js';
	import { logEvent } from '$lib/firebase.js';
	import type { SpeciesRecord } from '$lib/models/ebird.js';
	import { updateSEOData } from '$lib/stores/seo.store.js';

	export let data;
	$: ({ results } = data);
	$: queryID = results.queryID;

	$: if (results) {
		updateSEOData({
			title: `Results for "${results.query}"`,
			description: `Results for "${results.query}"`,
			url: $page.url.toString()
		});
	}

	function handleSelection(record: SpeciesRecord, position: number) {
		if (!queryID) return;
		AlgoliaSearchClient.objectClickedAfterSearch(queryID, record.speciesCode, position);
		logEvent('species_selected', { speciesCode: record.speciesCode });
		goto(`/species/${record.speciesCode}`);
	}
</script>

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
