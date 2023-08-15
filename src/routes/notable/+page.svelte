<script lang="ts">
	import { page } from '$app/stores';
	import NotableSpeciesMap from '$lib/components/maps/NotableSpeciesMap.svelte';
	import { updateSEOData } from '$lib/stores/seo.store';

	updateSEOData({
		title: `Nearby Notable Species`,
		description: `Notable species observations near you`,
		url: $page.url.toString()
	});
</script>

<div class="flex flex-col w-full items-stretch justify-start relative">
	<div class="p-4">
		<h4>Nearby Notable Species</h4>
	</div>
	<NotableSpeciesMap />
</div>
