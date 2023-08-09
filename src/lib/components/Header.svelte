<script lang="ts">
	import SearchBar from './SearchBar.svelte';
</script>

<header class="flex flex-row space-between p-4">
	<a class="text-3xl flex flex-row justify-start items-center gap-2" href="/">
		<img src="/logo.svg" alt="" class="w-8" />
		<div class="font-bebas tracking-wider text-white">Feather Finder</div>
	</a>
	<div class="flex-1" />
	<div class="w-full max-w-lg">
		<SearchBar />
	</div>
</header>
