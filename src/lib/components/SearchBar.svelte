<script lang="ts">
	import { goto } from '$app/navigation';
	import { AlgoliaSearchClient } from '$lib/algolia';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import * as _ from 'underscore';
	// TODO: The whole dropdown search bar is a mess. Refactor it.
	let query = '';
	const showResults = writable(false);
	const loading = writable(false);
	const isFocused = writable(false);
	const results = writable<any[]>([]);
	const searchClient = new AlgoliaSearchClient();

	const dispatcher = createEventDispatcher();

	$: if (query.length > 2) {
		_.debounce(async () => {
			loading.set(true);
			showResults.set(true);
			await search(query);
			loading.set(false);
		}, 300)();
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

	function handleSelect(speciesCode: string) {
		dispatcher('select');
		clearResults();
		showResults.set(false);
		goto(`/species/${speciesCode}`);
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
				on:focus={() => isFocused.set(true)}
				placeholder="Search by name..."
			/>
			<div
				class="{$showResults && !$loading && $isFocused
					? 'visible'
					: 'hidden'} absolute w-full max-h-96 overflow-y-auto z-50 bg-base-100 p-4 border border-base-300 mt-2 text-white"
			>
				<ul>
					{#each $results as result}
						<li class="p-2 hover:bg-base-200">
							<button on:click={() => handleSelect(result.speciesCode)}>{result.comName}</button>
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
