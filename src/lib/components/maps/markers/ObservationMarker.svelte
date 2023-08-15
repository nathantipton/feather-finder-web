<script lang="ts">
	import type { Observation_DTO } from '$lib/models/ebird';
	import { getDaysBackColor } from '$lib/utilities/maps';
	import mapboxgl from 'mapbox-gl';
	import { getContext, onDestroy } from 'svelte';
	import { derived, type Writable } from 'svelte/store';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	export let observation: Observation_DTO;

	const mapStore: Writable<mapboxgl.Map | null> = getContext('map');
	let map;

	const loadedMapStore = derived(mapStore, ($map) => $map);

	let marker: mapboxgl.Marker | null = null;

	async function handleShareButtonClick() {
		try {
			await navigator.share({
				title: `Check out this ${observation.comName}`,
				text: `${observation.comName} was spotted at ${observation.locName} ${dayjs().to(
					dayjs(observation.obsDt)
				)}.`,
				// url is the url of the current page
				url: window.location.href
			});
		} catch (err) {
			console.error(err);
		}
	}

	loadedMapStore.subscribe(($map) => {
		map = $map;
		if (map) {
			// Create container div for the popup content
			const divElement = document.createElement('div');
			divElement.className = 'flex flex-col max-w-xs justify-start items-stretch';

			// Create title
			const title = document.createElement('h6');
			title.textContent = observation.comName;
			divElement.appendChild(title);

			// Create observation info
			const observationInfo = document.createElement('p');
			observationInfo.className = 'text-xs';
			observationInfo.textContent = `${observation.locName}: ${observation.howMany} found`;
			divElement.appendChild(observationInfo);

			// Create time info
			const timeInfo = document.createElement('p');
			timeInfo.className = 'text-xs';
			timeInfo.textContent = dayjs().to(dayjs(observation.obsDt));
			divElement.appendChild(timeInfo);

			// Create share button
			const shareBtn = document.createElement('button');
			shareBtn.className = 'btn btn-sm mt-4';
			shareBtn.textContent = 'Share';
			shareBtn.addEventListener('click', handleShareButtonClick);
			divElement.appendChild(shareBtn);

			const popup = new mapboxgl.Popup({
				closeButton: false,
				offset: 25
			}).setDOMContent(divElement);
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
