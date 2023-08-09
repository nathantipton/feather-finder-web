<script lang="ts">
	import { AlgoliaSearchClient } from '$lib/algolia';
	import { writable } from 'svelte/store';

	let query = '';
	const showResults = writable(false);
	const results = writable<any[]>([]);
	const searchClient = new AlgoliaSearchClient();

	$: if (query.length > 2) {
		showResults.set(true);

		searchClient.query(query).then((res) => {
			results.set(res.hits as any[]);
			console.log(res.hits);
		});
	} else {
		showResults.set(false);
	}

	function clearResults() {
		query = '';
		showResults.set(false);
		results.set([]);
	}
</script>

<form class="w-full" action="/results" autocomplete="off">
	<div class="form-control flex flex-row join border border-base-300">
		<div class="flex-1 relative">
			<input
				class="input w-full join-item"
				type="text"
				name="search"
				id="search"
				bind:value={query}
				placeholder="Search by species name..."
			/>
			<div
				class="{$showResults
					? 'visible'
					: 'hidden'} absolute w-full max-h-96 overflow-y-auto z-50 bg-base-100 p-4 border border-base-300 mt-2 text-white"
			>
				<ul>
					{#each $results as result}
						<li class="p-2 hover:bg-base-200">
							<a href="/species/{result.speciesCode} " on:click={() => clearResults()}
								>{result.comName}</a
							>
						</li>
					{/each}
					{#if $results.length === 0}
						<li class="p-2">No results found</li>
					{/if}
				</ul>
			</div>
		</div>

		<button class="btn join-item" type="submit">Search</button>
	</div>
</form>
