<script lang="ts">
	import mapboxgl from '$lib/mapbox';
	import { getUserLocation, userCoordinates } from '$lib/stores/location';
	import { onMount } from 'svelte';

	onMount(async () => {
		await getUserLocation();

		userCoordinates.subscribe((coords) => {
			const map = new mapboxgl.Map({
				container: 'notable-species-map',
				style: 'mapbox://styles/mapbox/light-v11',
				center: [coords.lng, coords.lat],
				zoom: 9
			});

			const currentLocation = new mapboxgl.Marker().setLngLat([coords.lng, coords.lat]).addTo(map);
		});
	});
</script>

<div id="notable-species-map" class="h-96" />
