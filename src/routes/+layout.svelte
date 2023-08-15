<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '@fontsource/bebas-neue';
	import '../styles/app.postcss';
	import { browser } from '$app/environment';
	import { colorSchemeWatcher } from '$lib/utilities/ui';
	import SEO from '$lib/components/SEO.svelte';

	if (browser) {
		colorSchemeWatcher();
	}
</script>

<SEO />

<!-- Main -->
<div class="min-h-screen-safe flex flex-col justify-start items-stretch">
	<!-- Header -->
	<Header />

	<main class="flex-1 flex items-stretch">
		<slot />
	</main>

	<!-- Footer -->
	<footer>
		<div class="flex flex-col justify-center items-center">
			<!-- Copyright text -->
			<div class="text-sm">
				This is a portfolio project. Nathan Tipton, {new Date().getFullYear()}
			</div>
		</div>
	</footer>
</div>
