<script lang="ts">
	import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, buildMap, contextKey } from '$lib/mapbox';
	import { colorScheme } from '$lib/stores/ui.store';
	import mapboxgl from 'mapbox-gl';
	import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let center: [number, number] = DEFAULT_MAP_CENTER;
	export let zoom: number = DEFAULT_MAP_ZOOM;
	export let disableInteractivity = false;

	let map: mapboxgl.Map | null = null;
	const mapStore = writable<mapboxgl.Map | null>(null);

	const MAP_STYLES = {
		light: 'mapbox://styles/mapbox/navigation-day-v1',
		dark: 'mapbox://styles/mapbox/navigation-night-v1'
	};

	const dispatcher = createEventDispatcher();

	onMount(() => {
		map = new mapboxgl.Map({
			container: 'map',
			style: MAP_STYLES[$colorScheme],
			center,
			zoom,
			attributionControl: false,
			logoPosition: 'top-left',
			interactive: !disableInteractivity
		});
		map.addControl(new mapboxgl.AttributionControl(), 'top-right');
		map.on('load', () => {
			mapStore.set(map);
		});
		map.on('moveend', () => {
			dispatcher('move', {
				center: map?.getCenter(),
				zoom: map?.getZoom()
			});
		});
	});

	onDestroy(() => {
		map?.remove();
		map = null;
	});

	setContext(contextKey, mapStore);
</script>

<div id="map" class="w-full h-full">
	{#if map}
		<slot />
	{/if}
</div>
