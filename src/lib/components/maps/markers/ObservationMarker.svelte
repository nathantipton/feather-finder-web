<script lang="ts">
	import type { Observation_DTO } from '$lib/models/ebird';
	import { getDaysBackColor } from '$lib/utilities/maps';
	import mapboxgl from 'mapbox-gl';
	import { getContext, onDestroy } from 'svelte';
	import { derived, type Writable } from 'svelte/store';

	export let observation: Observation_DTO;

	const mapStore: Writable<mapboxgl.Map | null> = getContext('map');
	let map;

	const loadedMapStore = derived(mapStore, ($map) => $map);

	let marker: mapboxgl.Marker | null = null;

	loadedMapStore.subscribe(($map) => {
		map = $map;
		if (map) {
			const popup = new mapboxgl.Popup().setHTML(
				`<div class="text-lg font-bold">${observation.comName}</div>${observation.locName}: (${observation.howMany} found)`
			);
			marker = new mapboxgl.Marker({
				color: getDaysBackColor(new Date(observation.obsDt))
			})
				.setLngLat([observation.lng, observation.lat])
				.setPopup(popup)
				.addTo(map);
		}
	});

	onDestroy(() => {
		marker?.remove();
	});
</script>
