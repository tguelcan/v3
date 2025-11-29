<script lang="ts">
	import Claim from './Claim.svelte';
	import { fade, fly } from 'svelte/transition';

	let show = $state(false);

	$effect(() => {
		show = true;
	});
</script>

{#if show}
	<div
		class="w-full hidden md:relative md:flex flex-col justify-end bg-primary rounded-box text-base-content overflow-hidden"
	>
		<div in:fly={{ y: 10, duration: 800 }} class="z-30 px-3 md:px-6">
			<Claim />
		</div>
		<div class="z-20 grid lg:grid-cols-3 gap-3 md:gap-6 p-3 md:p-6">
			<div
				in:fly={{ y: 10, duration: 800, delay: 150 }}
				class="lg:col-span-2 bg-base-100 text-base-content card card-body"
			>
				<div class="card-title">Hello</div>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, atque.</p>
			</div>
			<div
				in:fly={{ y: 10, duration: 800, delay: 250 }}
				class="bg-base-100 text-base-content card card-body"
			>
				<div class="card-title">Hello</div>
				<p>Lorem ipsum dolor sit amet consectetur.</p>
			</div>
		</div>
		<div
			in:fade={{ duration: 1000, delay: 150 }}
			class="z-30 pb-3 px-3 md:pb-6 md:px-6 justify-end flex text-base-100/70 dark:text-base-content/50 text-xs"
		>
			Picture by&nbsp;<a
				href="https://unsplash.com/de/@cansu_tech?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
				target="_blank">Cansu Sarp</a
			>
		</div>
		<div class="inset-0 absolute z-10"></div>
		<img in:fade src="/img/bg.svg" alt="background" class="absolute size-full object-cover" />
	</div>
{/if}
