<script lang="ts">
	import ObservationsMap from './ObservationsMap.svelte';

	/**
	 * Whether to disable query parameters for the map center and zoom.
	 */
	export let disableQueryParams = false;
	/**
	 * Whether to disable the refetch button on map move.
	 */
	export let disableRefetch = false;
	export let disableInteractivity = false;
</script>

<div class="h-full w-full relative">
	<ObservationsMap
		fetchUrl="/api/ebird/notable"
		{disableQueryParams}
		{disableRefetch}
		{disableInteractivity}
	/>
</div>
