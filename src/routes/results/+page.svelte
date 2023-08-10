<script lang="ts">
	import { goto } from '$app/navigation';
	import { AlgoliaSearchClient } from '$lib/algolia.js';
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

<div class="px-4 w-full">
	<h2>Results for "{results.query}"</h2>
	<p>Found {results.nbHits} species in {results.processingTimeMS}ms</p>

	<div class="divider" />
	<div class="flex flex-col gap-4">
		{#each results.hits as result, index}
			<a
				href={`/species/${result.speciesCode}`}
				class="p-4 rounded"
				on:click={() => handleSelection(result, index + 1)}
			>
				<h4>{result.comName}</h4>
				<h6>{result.familyComName}</h6>
				<p>{result.sciName}</p>
			</a>
		{/each}
	</div>
</div>
