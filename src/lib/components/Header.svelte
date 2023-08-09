<script lang="ts">
	import { writable } from 'svelte/store';
	import SearchBar from './SearchBar.svelte';
	const showSearchBar = writable(false);

	function handleSelect(e: CustomEvent<string>) {
		showSearchBar.set(false);
	}
</script>

{#if !$showSearchBar}
	<header class="flex flex-row justify-between w-full items-center p-4 gap-8">
		<a href="/" class="w-56">
			<img src="/logo_full_white.svg" alt="" />
		</a>

		<button
			class="md:hidden text-lg btn-circle btn-ghost"
			on:click={() => showSearchBar.update((v) => !v)}
		>
			<i class="fa-solid fa-search" />
		</button>
		<SearchBar class="w-full max-w-md hidden md:block" />
	</header>
{/if}

{#if $showSearchBar}
	<header class="flex flex-row justify-between w-full items-center p-4 gap-8">
		<SearchBar class="w-full" on:select={handleSelect} />
		<button class="btn btn-ghost" on:click={() => showSearchBar.update((v) => !v)}>
			<i class="fa-solid fa-xmark" />
		</button>
	</header>
{/if}
