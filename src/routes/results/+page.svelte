<script lang="ts">
	export let data;
	const { results } = data;
</script>

<div class="px-4">
	<h1>Results for "{results.query}"</h1>
	<p>Found {results.nbHits} species in {results.serverTimeMS || results.processingTimeMS}ms</p>

	<div class="divider" />
	<div class="flex flex-col gap-4">
		{#each results.hits as result}
			<div class="dark:bg-zinc-900 p-4 rounded">
				<h2>{result.comName}</h2>
				<h3>{result.familyComName}</h3>
				<p>{result.sciName}</p>
			</div>
		{/each}
	</div>
</div>
