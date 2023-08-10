<script lang="ts">
	import { getUserLocation, userCoordinates } from '$lib/stores/location.store';
	import mapboxgl, { buildMap, buildUserLocationMarker } from '$lib/mapbox';
	import { onDestroy, onMount } from 'svelte';
	import type { SpeciesObservation_DTO } from '$lib/models/ebird';
	import { writable, type Unsubscriber } from 'svelte/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getDaysBackColor } from '$lib/utilities/maps';

	let map: mapboxgl.Map | null = null;
	let lat = 0;
	let lng = 0;

	export let speciesCode: string | null;
	const selectedSpeciesCode = writable<string | null>(null);
	$: selectedSpeciesCode.set(speciesCode);

	const showRefetchButton = writable(false);
	const hasCoordParams = writable(false);

	let currentLocationMarker: mapboxgl.Marker;
	let speciesMarkers = new Map<string, mapboxgl.Marker>();
	let userCoordsUnsubscriber: Unsubscriber = () => {};

	onMount(async () => {
		initializeMap();
	});

	onDestroy(() => {
		if (map) {
			map.remove();
			map = null;
		}
		userCoordsUnsubscriber();
	});

	async function initializeMap() {
		await getUserLocation();
		map = buildMap('species-observations-map');

		if (!map) return;

		// Set map coordinates from query params
		const queryParams = new URLSearchParams(window.location.search);
		setMapCoordinatesFromParams(queryParams);

		// Add user location marker
		currentLocationMarker = buildUserLocationMarker(map);

		map.addControl(new mapboxgl.AttributionControl(), 'top-right');
		map.on('moveend', handleMapMove);

		initializeUserCoordinatesListener();

		selectedSpeciesCode.subscribe(async (code) => {
			if (!code) return;
			await getSpeciesObservations(lat, lng, map!);
		});
	}

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

	function clearSpeciesMarkers() {
		speciesMarkers.forEach((marker) => marker.remove());
		speciesMarkers.clear();
	}

	function refetch() {
		getSpeciesObservations(lat, lng, map!);
		showRefetchButton.set(false);
	}

	function handleMapMove() {
		const center = map!.getCenter();
		const zoom = map!.getZoom();
		if (center.lat === lat && center.lng === lng) {
			return;
		}
		lat = center.lat;
		lng = center.lng;

		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('lat', lat.toString());
		query.set('lng', lng.toString());
		query.set('z', zoom.toString());

		showRefetchButton.set(true);

		goto(`?${query.toString()}`);
	}

	function setMapCoordinatesFromParams(queryParams: URLSearchParams) {
		const lat = queryParams.get('lat');
		const lng = queryParams.get('lng');
		const zoom = queryParams.get('z');

		if (lat && lng) {
			hasCoordParams.set(true);
			setMapPosition(parseFloat(lat), parseFloat(lng), parseFloat(zoom || '9'));
		}
	}

	function initializeUserCoordinatesListener() {
		userCoordsUnsubscriber = userCoordinates.subscribe(async (coords) => {
			if (!coords || (coords.lat === lat && coords.lng === lng)) return;
			if (!$hasCoordParams) {
				setMapPosition(coords.lat, coords.lng, 9);
			}
			currentLocationMarker.setLngLat([coords.lng, coords.lat]);
		});
	}

	function setMapPosition(lat: number, lng: number, zoom: number) {
		lat = lat;
		lng = lng;
		map?.setCenter([lng, lat]);
		map?.setZoom(zoom);
	}
</script>

<div id="species-observations-map" class="w-full h-full" />
{#if $showRefetchButton}
	<button class="absolute z-50 btn bottom-6 left-6" on:click={refetch}>Search this area</button>
{/if}
