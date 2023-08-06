<script lang="ts">
	export let data;
	const { results } = data;
</script>

<div class="px-4 w-full">
	<h2>Results for "{results.query}"</h2>
	<p>Found {results.nbHits} species in {results.processingTimeMS}ms</p>

	<div class="divider" />
	<div class="flex flex-col gap-4">
		{#each results.hits as result}
			<a
				href={`/species/${result.speciesCode}`}
				class="dark:bg-zinc-900 p-4 rounded hover:bg-zinc-50 hover:dark:bg-zinc-800 transition-all"
			>
				<h4>{result.comName}</h4>
				<h6>{result.familyComName}</h6>
				<p>{result.sciName}</p>
			</a>
		{/each}
	</div>
</div>
