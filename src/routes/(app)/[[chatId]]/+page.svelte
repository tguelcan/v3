<script lang="ts">
	import type { PageProps } from './$types';
	import Wrapper from '$components/Wrapper.svelte';
	import Messages from '$components/Messages.svelte';
	import Composer from '$components/Composer.svelte';
	import Welcome from '$components/Welcome.svelte';

	let { data }: PageProps = $props();

	// Reactively update the key when messages change
	let key = $derived(data?.messages?.length);
</script>

<svelte:head>
	<title>{data?.title || 'Chat App'}</title>
</svelte:head>

{#key key}
	<Wrapper {data}>
		<Welcome />
		<Messages />
		<Composer />
	</Wrapper>
{/key}
