<script lang="ts">
	import '../styles/app.postcss';
</script>

<!-- Main -->
<div class="min-h-screen-safe flex flex-col justify-start items-stretch dark:bg-zinc-950">
	<!-- Header -->
	<header class="flex flex-row p-4">
		<a class="text-2xl" href="/">Feather Finder</a>
	</header>

	<main class="flex-1">
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
