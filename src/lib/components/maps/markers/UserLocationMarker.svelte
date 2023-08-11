<script lang="ts">
	import { getUserLocation, userCoordinates } from '$lib/stores/location.store';
	import mapboxgl from 'mapbox-gl';
	import { getContext } from 'svelte';
	import { type Writable, derived } from 'svelte/store';

	const mapStore: Writable<mapboxgl.Map | null> = getContext('map');
	let map: mapboxgl.Map | null = null;

	const loadedMapStore = derived(mapStore, ($map) => $map);

	getUserLocation();
	loadedMapStore.subscribe(($map) => {
		map = $map;
		if (map && $userCoordinates) {
			const currentLocationElement = document.createElement('div');
			currentLocationElement.className = 'current-location-marker';

			new mapboxgl.Marker(currentLocationElement)
				.setLngLat([$userCoordinates.lng, $userCoordinates.lat])
				.addTo(map);
		}
	});
</script>
