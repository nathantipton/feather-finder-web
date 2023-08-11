<script lang="ts">
	import ObservationsMap from './ObservationsMap.svelte';
	/**
	 * Species code for the map
	 */
	export let speciesCode: string;

	/**
	 * Whether to disable query parameters for the map center and zoom.
	 */
	export let disableQueryParams = false;
	/**
	 * Whether to disable the refetch button on map move.
	 */
	export let disableRefetch = false;
</script>

<div class="h-full w-full relative">
	<ObservationsMap
		fetchUrl="/api/ebird/observations_by_species/{speciesCode}"
		{disableQueryParams}
		{disableRefetch}
	/>
</div>
