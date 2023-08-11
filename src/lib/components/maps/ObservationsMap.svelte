<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Map from '$lib/components/maps/Map.svelte';
	import ObservationMarker from '$lib/components/maps/markers/ObservationMarker.svelte';
	import UserLocationMarker from '$lib/components/maps/markers/UserLocationMarker.svelte';
	import mapboxgl, { DEFAULT_MAP_CENTER } from '$lib/mapbox';
	import type { Observation_DTO } from '$lib/models/ebird';
	import { getUserLocation, userCoordinates } from '$lib/stores/location.store';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * Whether to disable query parameters for the map center and zoom.
	 */
	export let disableQueryParams = false;
	/**
	 * Whether to disable the refetch button on map move.
	 */
	export let disableRefetch = false;
	export let disableInteractivity = false;
	export let fetchUrl: string;

	const showRefetchButton = writable(false);
	const observations = writable<Observation_DTO[]>([]);
	const center = writable<[number, number] | null>(null);
	const zoom = writable(8);
	let nextId = 1;

	// when the url changes refetch the observations
	// ex: when species code changes in the url
	$: if (fetchUrl && $center) {
		fetchObservations($center[0], $center[1]);
	}

	onMount(async () => {
		await initializeMapCenterAndZoom();
	});

	async function initializeMapCenterAndZoom() {
		// Get the query parameters
		const latParam = $page.url.searchParams.get('lat');
		const lngParam = $page.url.searchParams.get('lng');
		const zoomParam = $page.url.searchParams.get('zoom');

		if (latParam && lngParam && !disableQueryParams) {
			center.set([parseFloat(lngParam), parseFloat(latParam)]);
			zoom.set(zoomParam ? parseFloat(zoomParam) : 8);
		} else {
			try {
				await getUserLocation();
				if ($userCoordinates) {
					center.set([$userCoordinates.lng, $userCoordinates.lat]);
					zoom.set($userCoordinates.zoom || 8);
				} else {
					center.set(DEFAULT_MAP_CENTER);
					zoom.set(8);
				}
			} catch (e) {
				console.error('Error getting user location', e);
				center.set(DEFAULT_MAP_CENTER);
			}
		}

		if ($center) {
			fetchObservations($center[0], $center[1]);
		}
	}

	async function fetchObservations(lng: number, lat: number) {
		const notable = await fetch(fetchUrl, {
			method: 'POST',
			body: JSON.stringify({
				lat,
				lng
			})
		});

		const observationsData = await notable.json();
		observationsData.forEach((o: Observation_DTO) => {
			o.id = nextId++;
		});

		// Pre-parse dates for performance
		const preParsedDates = observationsData.map((o: Observation_DTO) =>
			new Date(o.obsDt).valueOf()
		);

		// Sort with pre-parsed dates
		observationsData.sort((a: Observation_DTO, b: Observation_DTO) => {
			return preParsedDates[b.id!] - preParsedDates[a.id!];
		});
		observations.set(observationsData);
	}

	function refetch() {
		if (!$center) return;
		showRefetchButton.set(false);
		fetchObservations($center[0], $center[1]);
	}

	function handleMove(event: CustomEvent<{ center: mapboxgl.LngLat; zoom: number }>) {
		const { lng, lat } = event.detail.center;

		if (!disableQueryParams) {
			$page.url.searchParams.set('lat', parseFloat(lat.toString()).toFixed(4));
			$page.url.searchParams.set('lng', parseFloat(lng.toString()).toFixed(4));
			$page.url.searchParams.set('zoom', parseFloat(event.detail.zoom.toString()).toFixed(4));
			goto(`?${$page.url.searchParams.toString()}`);
		}

		center.set([lng, lat]);
		zoom.set(event.detail.zoom);
		if (!disableRefetch) showRefetchButton.set(true);
	}
</script>

<div class="h-full w-full relative">
	{#if $center}
		<Map center={$center} zoom={$zoom} on:move={(e) => handleMove(e)} {disableInteractivity}>
			{#each $observations as observation (observation.id)}
				<ObservationMarker {observation} />
			{/each}
			<UserLocationMarker />
		</Map>
		{#if $showRefetchButton}
			<button class="btn btn-outline bg-base-100 absolute top-8 right-4" on:click={refetch}
				>Search this area</button
			>
		{/if}
	{/if}
</div>
