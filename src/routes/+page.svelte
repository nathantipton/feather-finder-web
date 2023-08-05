<script lang="ts">
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import NotableSpeciesMap from '$lib/components/maps/NotableSpeciesMap.svelte';

	// if production, redirect to /coming-soon
	if (!dev) {
		goto('/coming-soon');
	}
</script>

<div class="flex flex-col relative">
	<div>
		<NotableSpeciesMap />
	</div>
	<div class="md:-mt-8 bg-zinc-900 z-40 container mx-auto md:rounded-xl max-w-2xl mb-4 p-4">
		<form class=" w-full">
			<div class="form-control flex flex-row join">
				<input
					class="input flex-1 join-item"
					type="text"
					name="search"
					id="search"
					placeholder="Search by species name..."
				/>
				<button class="btn join-item" type="submit">Search</button>
			</div>
		</form>
	</div>
	<div class="px-4">menu options, recently searched, browse by name</div>
</div>

<style>
	:global(.mapboxgl-ctrl-bottom-left) {
		bottom: 30px;
	}
</style>
