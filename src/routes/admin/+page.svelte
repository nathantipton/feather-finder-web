<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form action="?/sync_region" method="POST" class="px-4" use:enhance>
	<button class="btn" type="submit">Sync Region</button>
</form>

<form action="?/flag_hybrid" method="POST" class="px-4" use:enhance>
	<button class="btn" type="submit">Flag Hybrid</button>
</form>
