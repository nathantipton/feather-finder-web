<script lang="ts">
	import mapboxgl from '$lib/mapbox';
	import type { NearbyNotableSpecies_DTO } from '$lib/models/ebird';
	import { getUserLocation, userCoordinates } from '$lib/stores/location.store';
	import { getDaysBackColor } from '$lib/utilities/maps';
	import { onMount } from 'svelte';

	// TODO: Refactor this the logic out of this map
	let lat = 0;
	let lng = 0;

	export let colorScheme: 'dark' | 'light';

	onMount(async () => {
		await getUserLocation();
		const map = new mapboxgl.Map({
			container: 'notable-species-map',
			style: `mapbox://styles/mapbox/${colorScheme}-v11`,
			center: [0, 0],
			zoom: 9,
			attributionControl: false,
			logoPosition: 'top-left'
		});

		const currentLocationElement = document.createElement('div');
		currentLocationElement.className = 'current-location-marker';

		const currentLocation = new mapboxgl.Marker(currentLocationElement)
			.setLngLat([0, 0])
			.addTo(map);
		map.addControl(new mapboxgl.AttributionControl(), 'top-right');

		userCoordinates.subscribe(async (coords) => {
			if (!coords || (coords.lat === lat && coords.lng === lng)) return;
			lat = coords.lat;
			lng = coords.lng;

			map.setCenter([lng, lat]);
			currentLocation.setLngLat([lng, lat]);

			await getNotableSpecies(lat, lng, map);
		});
	});

	async function getNotableSpecies(lat: number, lng: number, map: mapboxgl.Map) {
		const notable = await fetch('/api/ebird/notable', {
			method: 'POST',
			body: JSON.stringify({
				lat,
				lng
			})
		});

		const species: NearbyNotableSpecies_DTO[] = await notable.json();
		species
			.sort((a, b) => new Date(a.obsDt).valueOf() - new Date(b.obsDt).valueOf())
			.forEach((s) => {
				const popup = new mapboxgl.Popup().setHTML(
					`<div class="text-lg font-bold">${s.comName}</div>${s.locName}: (${s.howMany} found)`
				);

				new mapboxgl.Marker({
					color: getDaysBackColor(new Date(s.obsDt))
				})
					.setLngLat([s.lng, s.lat])
					.setPopup(popup)
					.addTo(map);
			});
	}
</script>

<div id="notable-species-map" class="h-full w-full" />
