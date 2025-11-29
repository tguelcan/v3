<script lang="ts">
	import Navigation from '$components/Navigation.svelte';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-dvh">
	<Navigation />
	{@render children()}
</div>
