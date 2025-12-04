<script lang="ts">
	import type { PageProps } from './$types';
	import { ImageUp } from '@lucide/svelte';
	import UploadImage from '$components/UploadImage.svelte';
	// Remotes
	import { logout } from '$remotes/auth.remote';

	let { data }: PageProps = $props();

	// Show upload modal
	let show = $state(false);
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<UploadImage bind:show image={data?.image} />
<div class="flex flex-col items-center text-center mt-6 space-y-6">
	<button class="mask mask-squircle relative group cursor-pointer" onclick={() => (show = true)}>
		<ImageUp
			class="opacity-0 group-hover:opacity-100 group-hover:motion-preset-slide-up absolute m-auto inset-0 text-primary-content z-10"
		/>
		<div
			class="opacity-0 bg-primary absolute inset-0 group-hover:opacity-30 z-0 transition-opacity"
		></div>
		{#if data?.image}
			<img class="w-28" src="/images/{data?.image}" alt="Profile" />
		{:else}
			<div class="size-28">
				<div
					class="bg-neutral flex items-center justify-center text-center leading-0 text-neutral-content size-full"
				>
					<span class="opacity-100 group-hover:opacity-0 text-3xl uppercase"
						>{data?.email?.charAt(0)}</span
					>
				</div>
			</div>
		{/if}
	</button>
	<p>{data?.email}</p>
	<form method="POST">
		<button formaction={logout.action} class="btn btn-primary">Logout</button>
	</form>
</div>
<!-- --
<pre>{JSON.stringify(data, null, 2)}</pre>
-->
