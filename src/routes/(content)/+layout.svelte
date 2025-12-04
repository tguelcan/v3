<script>
	import Navigation from '$components/Navigation.svelte';
	import Footer from '$components/Footer.svelte';

	let { children } = $props();
</script>

<main class="min-h-dvh flex flex-col">
	<Navigation />
	<div class="flex-1 prose my-6 w-full max-w-4xl mx-auto">
		{@render children()}
	</div>
	<Footer />
</main>
