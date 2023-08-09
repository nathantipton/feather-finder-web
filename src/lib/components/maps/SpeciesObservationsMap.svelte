<script lang="ts">
	import { getUserLocation, userCoordinates } from '$lib/stores/location.store';
	import mapboxgl from '$lib/mapbox';
	import { onMount } from 'svelte';
	import type { SpeciesObservation_DTO } from '$lib/models/ebird';
	import { writable } from 'svelte/store';
	import { getDaysBackColor } from '$lib/utilities/maps';

	let map: mapboxgl.Map | null = null;
	let lat = 0;
	let lng = 0;

	export let speciesCode: string | null;
	const selectedSpeciesCode = writable<string | null>(null);
	$: selectedSpeciesCode.set(speciesCode);

	const showRefetchButton = writable(false);

	let speciesMarkers = new Map<string, mapboxgl.Marker>();

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

			selectedSpeciesCode.subscribe(async (code) => {
				if (!code) return;
				await getSpeciesObservations(lat, lng, map!);
			});
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

		clearSpeciesMarkers();
		const species: SpeciesObservation_DTO[] = await observations.json();
		species
			.sort((a, b) => new Date(a.obsDt).valueOf() - new Date(b.obsDt).valueOf())
			.forEach((s) => {
				const popup = new mapboxgl.Popup().setHTML(
					`<div class="text-lg font-bold">${s.comName}</div>${s.locName}: (${s.howMany} found)`
				);

				const marker = new mapboxgl.Marker({
					color: getDaysBackColor(new Date(s.obsDt))
				})
					.setLngLat([s.lng, s.lat])
					.setPopup(popup)
					.addTo(map);
					
				speciesMarkers.set(s.subId, marker);
			});
	}

	function clearSpeciesMarkers(){
		speciesMarkers.forEach((marker) => marker.remove());
		speciesMarkers.clear();
	};

	function refetch(){
		getSpeciesObservations(lat, lng, map!);
		showRefetchButton.set(false);
	};
</script>

<div id="species-observations-map" class="w-full h-full" />
{#if $showRefetchButton}
	<button class="absolute z-50 btn bottom-6 left-6" on:click={refetch}>Search this area</button>
{/if}
