<script lang="ts">
	import { AlgoliaSearchClient } from '$lib/algolia';
	import { writable } from 'svelte/store';
	import * as _ from 'underscore';

	let query = '';
	const showResults = writable(false);
	const loading = writable(false);
	const results = writable<any[]>([]);
	const searchClient = new AlgoliaSearchClient();

	$: if (query.length > 2) {
		loading.set(true);
		showResults.set(true);
		_.debounce(async () => {
			await search(query);
			loading.set(false);
		}, 500)();
	} else {
		showResults.set(false);
	}

	async function search(q: string) {
		const res = await searchClient.query(q);
		results.set(res.hits as any[]);
	}

	function clearResults() {
		query = '';
		showResults.set(false);
		results.set([]);
	}
</script>

<form class={`w-full ${$$props.class}`} action="/results" autocomplete="off">
	<div class="form-control flex flex-row join border border-base-300">
		<div class="flex-1 relative">
			<input
				class="input w-full join-item"
				type="text"
				name="search"
				id="search"
				bind:value={query}
				placeholder="Search by name..."
			/>
			<div
				class="{$showResults && !$loading
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

		<button class="btn w-20 join-item" type="submit">
			{#if $loading}
				<div class="loading loading-bars" />
			{:else}
				Search
			{/if}
		</button>
	</div>
</form>
