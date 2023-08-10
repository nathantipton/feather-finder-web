<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ObservationsMap from '$lib/components/maps/ObservationsMap.svelte';
	import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, DEFAULT_MAP_STYLE } from '$lib/mapbox.js';
	import type { SpeciesObservation_DTO } from '$lib/models/ebird.js';
	import {
		getUserLocation,
		userCoordinates,
		userCoordinatesLoaded
	} from '$lib/stores/location.store.js';
	import { colorScheme } from '$lib/stores/ui.store.js';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;
	const center = writable<[number, number] | null>(null);
	const zoom = writable<number | null>(null);
	const initialFetchComplete = writable(false);
	const observations = writable<SpeciesObservation_DTO[]>([]);

	$: ({ speciesDetails } = data);
	$: ({ speciesCode } = $page.params);
	$: if (speciesCode) {
		fetchObservations();
	}

	onMount(() => {
		initializeMap();

		center.subscribe((center) => {
			// Need to fetch observations after map is initialized and center is set
			// After the first fetch, we don't need to fetch again when center changes
			// since the fetch is triggered by the refetch event
			if (center && !$initialFetchComplete) {
				fetchObservations();
				initialFetchComplete.set(true);
			}
		});
	});

	async function initializeMap() {
		await getUserLocation();
		userCoordinatesLoaded.subscribe(async (loaded) => {
			if (loaded) {
				intializedMapCenterAndZoom();
			}
		});
	}

	async function intializedMapCenterAndZoom() {
		const queryParams = new URLSearchParams(window.location.search);
		const latParam = queryParams.get('lat');
		const lngParam = queryParams.get('lng');
		const zoomParam = queryParams.get('zoom');
		if (latParam && lngParam) {
			center.set([parseFloat(lngParam), parseFloat(latParam)]);
			zoom.set(zoomParam ? parseFloat(zoomParam) : DEFAULT_MAP_ZOOM);
		} else if ($userCoordinates) {
			center.set([$userCoordinates.lng, $userCoordinates.lat]);
			zoom.set($userCoordinates.zoom);
		} else {
			center.set(DEFAULT_MAP_CENTER);
			zoom.set(DEFAULT_MAP_ZOOM);
		}
		await fetchObservations();
	}

	function handleMapMove(event: CustomEvent<{ lng: number; lat: number; zoom: number }>) {
		const { lng, lat } = event.detail;

		const queryParams = new URLSearchParams(window.location.search);
		queryParams.set('lat', parseFloat(lat.toString()).toFixed(4));
		queryParams.set('lng', parseFloat(lng.toString()).toFixed(4));
		queryParams.set('zoom', parseFloat(event.detail.zoom.toString()).toFixed(4));

		center.set([lng, lat]);
		zoom.set(event.detail.zoom);

		goto(`?${queryParams.toString()}`);
	}

	async function fetchObservations() {
		if (!$center) return;
		const [lng, lat] = $center;

		const observationResponse = await fetch('/api/ebird/observations_by_species', {
			method: 'POST',
			body: JSON.stringify({
				lat,
				lng,
				speciesCode
			})
		});
		const species: SpeciesObservation_DTO[] = await observationResponse.json();
		observations.set(species);
	}

	function handleRefetch(event: CustomEvent) {
		fetchObservations();
	}
</script>

<svelte:head>
	<title>{speciesDetails.comName} | Feather Finder</title>
	<meta name="description" content={`Observations of ${speciesDetails.comName}`} />
</svelte:head>

<div class="flex flex-col w-full items-stretch justify-start">
	<div class="px-4 py-2 w-full flex flex-row items-baseline justify-start gap-4">
		<h2>{speciesDetails.comName}</h2>
		<h6>{speciesDetails.familyComName}</h6>
	</div>
	{#if $center && $zoom && $userCoordinatesLoaded}
		<div class="relative flex-1">
			<ObservationsMap
				colorScheme={$colorScheme}
				center={$center}
				zoom={$zoom}
				observations={$observations}
				userLocation={$userCoordinates}
				on:mapMove={(e) => handleMapMove(e)}
				on:refetch={(e) => handleRefetch(e)}
			/>
		</div>
	{/if}
</div>
