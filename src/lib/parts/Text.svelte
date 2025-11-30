<script lang="ts">
	import type { UIMessage } from 'ai';
	import { marked } from 'marked';

	let { message, class: className } = $props<{ message: UIMessage; class?: string }>();
</script>

<!-- Skeleton loader -->
{#snippet loader()}
	<span class="skeleton w-full h-12"></span>
	<span class="skeleton w-1/3 h-12"></span>
	<span class="skeleton w-2/3 h-12"></span>
	<span class="skeleton w-2/4 h-12"></span>
{/snippet}

{@render loader()}

<div class={className}>
	{#each message.parts as part, partIndex (partIndex)}
		<!-- Get values -->
		{@const role = message.role}
		{@const state = part.state}
		{@const type = part.type}
		{@const text = part.type === 'text' && part.text}

		<!-- Reasoning indicator -->
		{@const reasoning = type === 'reasoning' && state === 'streaming'}

		<!-- Plane markdown text -->
		<div class="prose leading-snug max-w-none w-full">
			{@render loader()}
			{#if reasoning}
				{@render loader()}
			{:else if text && role === 'assistant'}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html marked(text)}
			{/if}
		</div>
	{/each}
</div>
