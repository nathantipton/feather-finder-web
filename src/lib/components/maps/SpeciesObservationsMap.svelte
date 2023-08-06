<script lang="ts">
	import { getUserLocation, userCoordinates } from '$lib/stores/location';
	import mapboxgl from '$lib/mapbox';
	import { onMount } from 'svelte';
	import type { SpeciesObservation_DTO } from '$lib/models/ebird';
	import { writable } from 'svelte/store';
	import { getDaysBackColor } from '$lib/utilities/maps';

	let map: mapboxgl.Map | null = null;
	let lat = 0;
	let lng = 0;
	export let speciesCode: string;

	const showRefetchButton = writable(false);

	onMount(async () => {
		await getUserLocation();
		map = new mapboxgl.Map({
			container: 'species-observations-map',
			style: 'mapbox://styles/mapbox/dark-v11',
			center: [0, 0],
			zoom: 9,
			attributionControl: false,
			logoPosition: 'top-left'
		});

		if (!map) return;

		const currentLocationElement = document.createElement('div');
		currentLocationElement.className = 'current-location-marker';

		const currentLocation = new mapboxgl.Marker(currentLocationElement)
			.setLngLat([0, 0])
			.addTo(map);
		map.addControl(new mapboxgl.AttributionControl(), 'top-right');

		map.on('moveend', () => {
			const center = map!.getCenter();
			if (center.lat === lat && center.lng === lng) {
				return;
			}
			lat = center.lat;
			lng = center.lng;

			showRefetchButton.set(true);
		});

		userCoordinates.subscribe(async (coords) => {
			if (!coords || (coords.lat === lat && coords.lng === lng)) return;
			lat = coords.lat;
			lng = coords.lng;

			map!.setCenter([lng, lat]);
			currentLocation.setLngLat([lng, lat]);

			await getSpeciesObservations(lat, lng, map!);
		});
	});

	async function getSpeciesObservations(lat: number, lng: number, map: mapboxgl.Map) {
		const observations = await fetch('/api/ebird/observations_by_species', {
			method: 'POST',
			body: JSON.stringify({
				lat,
				lng,
				speciesCode
			})
		});

		const species: SpeciesObservation_DTO[] = await observations.json();
		species.forEach((s) => {
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

	const refetch = () => {
		getSpeciesObservations(lat, lng, map!);
		showRefetchButton.set(false);
	};
</script>

<div id="species-observations-map" class="w-full h-full" />
{#if $showRefetchButton}
	<button class="absolute z-50 btn bottom-6 left-6" on:click={refetch}>Search this area</button>
{/if}
