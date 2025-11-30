<script>
	import { Mailbox } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	let { success = $bindable(), showBack = false, class: className } = $props();
</script>

<div in:fade class="flex flex-col items-center {className}">
	<Mailbox />
	<p class="text-center">Check your emails.</p>
	{#if showBack}
		<button class="btn btn-link" onclick={() => (success = null)}>Back</button>
	{/if}
</div>
