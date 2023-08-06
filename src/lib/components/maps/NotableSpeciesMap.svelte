<script lang="ts">
	import mapboxgl from '$lib/mapbox';
	import { getUserLocation, userCoordinates } from '$lib/stores/location';
	import postcss from 'postcss';
	import { onMount } from 'svelte';

	let lat = 0;
	let lng = 0;

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

		const species = await notable.json();
		species.forEach((s: any) => {
			const popup = new mapboxgl.Popup().setHTML(
				`<div class="text-lg font-bold">${s.comName}</div>${s.locName}: (${s.howMany} found)`
			);

			const marker = new mapboxgl.Marker({
				color: getDaysBackColor(s.obsDt)
			})
				.setLngLat([s.lng, s.lat])
				.setPopup(popup)
				.addTo(map);
		});
	}

	function getDaysBackColor(date: Date) {
		const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));

		if (days < 1) return '#dc2626';
		if (days < 2) return '#ea580c';
		if (days < 3) return '#eab308';
	}
</script>

<div id="notable-species-map" class="h-96" />

<style lang="postcss">
	:global(.mapboxgl-popup-content) {
		@apply bg-zinc-900 text-white p-4 rounded;
	}

	:global(.mapboxgl-popup-tip) {
		@apply !border-t-zinc-900 !border-l-zinc-900 !border-r-zinc-900 !border-b-zinc-900;
	}

	:global(.mapboxgl-popup-close-button) {
		@apply right-1 top-1;
	}

	:global(.current-location-marker) {
		@apply bg-blue-500 h-2 w-2 rounded-full;
		animation: 1s infinite shadow-pulse;
	}

	@keyframes shadow-pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
			border-radius: 50%;
		}
		100% {
			box-shadow: 0 0 0 15px transparent;
			border-radius: 50%;
		}
	}
</style>
