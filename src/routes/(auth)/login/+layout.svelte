<script lang="ts">
	import Infobox from './Infobox.svelte';

	let { children, box } = $props();
</script>

<div class="grid md:grid-cols-2 gap-4 h-dvh p-3 lg:p-6">
	<Infobox />
	<div>{@render children()}</div>
</div>
