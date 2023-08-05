<script lang="ts">
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import NotableSpeciesMap from '$lib/components/maps/NotableSpeciesMap.svelte';

	// if production, redirect to /coming-soon
	if (!dev) {
		goto('/coming-soon');
	}
</script>

<div>
	<div>
		<NotableSpeciesMap />
	</div>
	<div>
		<form action="">
			<div class="form-control">
				<input type="text" name="search" id="search" />
				<button type="submit">Search</button>
			</div>
		</form>
	</div>
	<div>menu options, recently searched, browse by name</div>
</div>
