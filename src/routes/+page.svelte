<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';

	import NotableSpeciesMap from '$lib/components/maps/NotableSpeciesMap.svelte';
	import { colorScheme } from '$lib/stores/ui.store';

	// Fake trends data until model is ready
	const fakeTrends = [
		{
			comName: 'Northern Cardinal',
			speciesCode: 'norcar'
		},
		{
			comName: 'American Robin',
			speciesCode: 'amerob'
		},
		{
			comName: 'Mourning Dove',
			speciesCode: 'moudov'
		},
		{
			comName: 'Blue Jay',
			speciesCode: 'blujay'
		},
		{
			comName: 'Bald Eagle',
			speciesCode: 'baleag'
		}
	];
</script>

<div class="flex flex-col relative w-full">
	<div class="h-96">
		<NotableSpeciesMap colorScheme={$colorScheme} />
	</div>
	<div
		class="md:-mt-8 bg-base-100 border border-base-300 dark:bg-zinc-800 z-40 container mx-auto md:rounded-xl max-w-2xl mb-4 p-4"
	>
		<SearchBar />
	</div>

	<div class="p-4 container mx-auto flex flex-col justify-start items-stretch gap-16">
		<section class="flex flex-col justify-start items-center gap-8">
			<h3><i class="fa-solid fa-chart-line mr-2" />Trending Searches</h3>
			<div class="flex flex-row gap-4 flex-wrap">
				{#each fakeTrends as trend, index (trend.speciesCode)}
					<a
						href={`/species/${trend.speciesCode}`}
						class="px-4 py-1 rounded-full border border-base-300"
					>
						<div class="whitespace-nowrap">
							{trend.comName} <i class="fa-solid fa-up-right-from-square fa-xs ml-2" />
						</div>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	:global(.mapboxgl-ctrl-bottom-left) {
		bottom: 30px;
	}
</style>
