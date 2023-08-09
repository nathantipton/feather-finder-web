<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';

	import NotableSpeciesMap from '$lib/components/maps/NotableSpeciesMap.svelte';
</script>

<div class="flex flex-col relative w-full">
	<div>
		<NotableSpeciesMap />
	</div>
	<div class="md:-mt-8 bg-zinc-800 z-40 container mx-auto md:rounded-xl max-w-2xl mb-4 p-4">
		<SearchBar />
	</div>
	<div class="px-4">menu options, recently searched, browse by name</div>
</div>

<style>
	:global(.mapboxgl-ctrl-bottom-left) {
		bottom: 30px;
	}
</style>
