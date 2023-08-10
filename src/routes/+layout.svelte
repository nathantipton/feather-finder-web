<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '@fontsource/bebas-neue';
	import '../styles/app.postcss';
	import { browser } from '$app/environment';
	import { colorSchemeWatcher } from '$lib/utilities/ui';

	if (browser) {
		colorSchemeWatcher();
	}
</script>

<svelte:head>
	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content="Feather Finder: Discover Birds Nearby" />
	<meta
		property="og:description"
		content="Explore and identify species of birds that have been spotted in your vicinity. Join the Feather Finder community today!"
	/>
	<meta property="og:image" content="%sveltekit.assets%/og_image_banner.png" />
	<!-- Replace with the URL to your image -->
	<meta property="og:url" content="https://feather-finder.com" />
	<!-- Replace with your website URL -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Feather Finder" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Feather Finder: Discover Birds Nearby" />
	<meta
		name="twitter:description"
		content="Explore and identify species of birds that have been spotted in your vicinity. Join the Feather Finder community today!"
	/>
	<meta name="twitter:image" content="%sveltekit.assets%/og_image_banner.png" />
</svelte:head>

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
