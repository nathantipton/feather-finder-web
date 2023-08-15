<script lang="ts">
	import { page } from '$app/stores';

	export let title = 'Feather Finder: Discover Birds Nearby';
	export let description =
		'Explore and identify species of birds that have been spotted in your vicinity. Join the Feather Finder community today!';
	export let url = $page.url.toString() ?? 'https://feather-finder.com';
	export let image = '/og_image_banner.png'; // Optional: for OpenGraph and Twitter card images
</script>

<title>{title} | Feather Finder</title>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
<meta property="og:url" content={url} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Feather Finder" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={'https://feather-finder.com' + image} />
