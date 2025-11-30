<script lang="ts">
	import type { PageProps } from './$types';
	import { logout } from '$remotes/auth.remote';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="flex flex-col items-center text-center mt-6 space-y-6">
	<div class="mask mask-squircle">
		{#if data?.image}
			<img
				class="w-28"
				src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"
				alt="Profile"
			/>
		{:else}
			<div class="size-28">
				<div
					class="bg-neutral flex items-center justify-center text-center leading-0 text-neutral-content size-full"
				>
					<span class="text-3xl uppercase">{data?.email?.charAt(0)}</span>
				</div>
			</div>
		{/if}
	</div>
	<p>{data?.email}</p>
	<form method="POST">
		<button formaction={logout.action} class="btn btn-primary">Logout</button>
	</form>
</div>
<!-- --
<pre>{JSON.stringify(data, null, 2)}</pre>
-->
