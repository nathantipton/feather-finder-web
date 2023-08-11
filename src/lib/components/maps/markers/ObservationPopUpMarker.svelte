<script lang="ts">
	import type { Observation_DTO } from '$lib/models/ebird';
	import type mapboxgl from 'mapbox-gl';
	import { getContext } from 'svelte';
	import { derived, type Writable } from 'svelte/store';

	export let observation: Observation_DTO;

	const mapStore: Writable<mapboxgl.Map | null> = getContext('map');
	let map: mapboxgl.Map | null = null;
	let popupElement: HTMLDivElement | null = null;
	const loadedMapStore = derived(mapStore, ($map) => $map);

	loadedMapStore.subscribe(($map) => {
		map = $map;
		if (map) {
			map.on('move', updateDropdownPosition);
			updateDropdownPosition();
		}
	});

	function updateDropdownPosition() {
		if (!popupElement || !map) return;

		const { x, y } = map.project({ lng: observation.lng, lat: observation.lat });

		popupElement.style.transform = `translate(${x}px, ${y - 20}px)`;
	}
</script>

<div bind:this={popupElement} class="dropdown dropdown-hover">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<label tabindex="0">
		<i class="fa-solid fa-location-dot text-2xl" />
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
		<li>Item 1</li>
		<li>Item 2</li>
	</ul>
</div>

<style>
	div.dropdown {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>
