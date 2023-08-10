<script lang="ts">
	import { buildMap, buildUserLocationMarker } from '$lib/mapbox';
	import type { SpeciesObservation_DTO } from '$lib/models/ebird';
	import type { UserCoordinates } from '$lib/stores/location.store';
	import { getDaysBackColor } from '$lib/utilities/maps';
	import mapboxgl from 'mapbox-gl';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatcher = createEventDispatcher();
	const showRefetchButton = writable(false);
	const mapInitialized = writable(false);
	let map: mapboxgl.Map | null = null;

	export let colorScheme: 'light' | 'dark' = 'dark';
	export let center: [number, number];
	export let zoom: number;
	export let observations: SpeciesObservation_DTO[] = [];
	export let userLocation: UserCoordinates | null = null;

	let userLocationMarker: mapboxgl.Marker | null = null;
	let speciesMarkers = new Map<string, mapboxgl.Marker>();

	$: if (userLocation && map) {
		if (!userLocationMarker) {
			userLocationMarker = buildUserLocationMarker(map, [userLocation.lng, userLocation.lat]);
		} else {
			userLocationMarker.setLngLat([userLocation.lng, userLocation.lat]);
		}
	}

	$: if (observations && map) {
		if (observations.length === 0) {
			clearSpeciesMarkers();
		} else {
			clearSpeciesMarkers();
			addSpeciesMarkers(observations, map);
		}
	}

	onMount(() => {
		initializeMap();
	});

	onDestroy(() => {
		if (map) {
			map.remove();
			map = null;
		}
	});

	function initializeMap() {
		map = buildMap('species-observations-map', colorScheme);
		map.addControl(new mapboxgl.AttributionControl(), 'top-right');
		map.on('moveend', handleMapMove);
		map.setCenter(center);
		map.setZoom(zoom);
		mapInitialized.set(true);
	}

	function clearSpeciesMarkers() {
		speciesMarkers.forEach((marker) => marker.remove());
		speciesMarkers.clear();
	}

	function addSpeciesMarkers(observations: SpeciesObservation_DTO[], map: mapboxgl.Map) {
		observations
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

	function refetch() {
		dispatcher('refetch');
		showRefetchButton.set(false);
	}

	function handleMapMove() {
		if (!map) return;
		const [lng, lat] = map.getCenter().toArray();
		const zoom = map.getZoom();

		showRefetchButton.set($mapInitialized);
		dispatcher('mapMove', {
			lng,
			lat,
			zoom
		});
	}
</script>

<div id="species-observations-map" class="w-full h-full" />
{#if $showRefetchButton}
	<button class="absolute z-50 btn bottom-6 left-6" on:click={refetch}>Search this area</button>
{/if}
