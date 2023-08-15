<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '@fontsource/bebas-neue';
	import '../styles/app.postcss';
	import { browser } from '$app/environment';
	import { colorSchemeWatcher } from '$lib/utilities/ui';
	import { onMount } from 'svelte';
	import { logEvent } from '$lib/firebase';
	import { seoData } from '$lib/stores/seo.store';

	if (browser) {
		colorSchemeWatcher();
	}

	onMount(() => {
		logEvent('page_view', { page_title: 'Home' });
	});
</script>

<svelte:head>
	<title>{$seoData.title} | Feather Finder</title>

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={$seoData.title} />
	<meta property="og:description" content={$seoData.description} />
	<meta property="og:image" content={$seoData.image} />
	<meta property="og:url" content={$seoData.url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Feather Finder" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$seoData.title} />
	<meta name="twitter:description" content={$seoData.description} />
	<meta name="twitter:image" content={$seoData.image} />
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
