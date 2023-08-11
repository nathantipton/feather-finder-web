<script lang="ts">
	import { writable } from 'svelte/store';
	import SearchBar from './SearchBar.svelte';
	import { colorScheme } from '$lib/stores/ui.store';
	import autoAnimate from '@formkit/auto-animate';
	const showSearchBar = writable(false);

	function handleSelect(e: CustomEvent<string>) {
		showSearchBar.set(false);
	}
</script>

<header
	class="flex flex-row justify-between w-full items-center p-4 gap-8 border-b border-base-300 h-24"
	use:autoAnimate={{ duration: 100 }}
>
	{#if $showSearchBar}
		<SearchBar class="w-full" on:select={handleSelect} />
		<button class="btn btn-ghost" on:click={() => showSearchBar.update((v) => !v)}>
			<i class="fa-solid fa-xmark" />
		</button>
	{:else}
		<a href="/" class="w-56">
			<img src={$colorScheme === 'dark' ? '/logo_full_white.svg' : '/logo_full_dark.svg'} alt="" />
		</a>

		<button
			class="md:hidden text-lg btn-circle btn-ghost"
			on:click={() => showSearchBar.update((v) => !v)}
		>
			<i class="fa-solid fa-search" />
		</button>
		<SearchBar class="w-full max-w-md hidden md:block" />
	{/if}
</header>
