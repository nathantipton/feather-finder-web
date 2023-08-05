<script lang="ts">
	import mapboxgl from '$lib/mapbox';
	import { getUserLocation, userCoordinates } from '$lib/stores/location';
	import { onMount } from 'svelte';

	onMount(async () => {
		await getUserLocation();
		const map = new mapboxgl.Map({
			container: 'notable-species-map',
			style: 'mapbox://styles/mapbox/dark-v11',
			center: [0, 0],
			zoom: 9,
			attributionControl: false,
			logoPosition: 'top-left'
		});

		const currentLocation = new mapboxgl.Marker().setLngLat([0, 0]).addTo(map);
		map.addControl(new mapboxgl.AttributionControl(), 'top-right');

		userCoordinates.subscribe((coords) => {
			map.setCenter([coords.lng, coords.lat]);
			currentLocation.setLngLat([coords.lng, coords.lat]);
		});
	});
</script>

<div id="notable-species-map" class="h-96" />
