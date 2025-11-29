<script lang="ts">
	import type { UIMessage } from 'ai';
	import { fade } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';

	let { message, class: className } = $props<{ message: UIMessage; class?: string }>();
	let isOpen = $state<string | null>(null);
	let overflowStatus = $state<Record<string, boolean>>({});

	// function to check if the message is overflowing for show more button on users question (ui)
	const checkOverflow = (node: HTMLDivElement, messageId: string) => {
		const checkSize = () => {
			const isOverflowing = node.scrollHeight > node.clientHeight;
			overflowStatus[messageId] = isOverflowing;
		};

		// Initial check mit kleinem Delay für Layout
		const timer = setTimeout(checkSize, 100);

		// ResizeObserver for check on resize
		const resizeObserver = new ResizeObserver(() => {
			// only check if the message is open
			if (isOpen !== messageId) {
				checkSize();
			}
		});

		resizeObserver.observe(node);

		return {
			destroy() {
				clearTimeout(timer);
				resizeObserver.disconnect();
			}
		};
	};
</script>

{#each message.parts as part, partIndex (partIndex)}
	<!-- Get values -->
	{@const id = message.id}
	{@const role = message.role}
	{@const type = part.type}
	{@const text = part.text}

	{#if type === 'text' && role === 'user'}
		<div class="border-b-2 border-base-300 {className}">
			<div
				use:checkOverflow={id}
				class="font-bold text-lg transition-all duration-500 ease-in-out overflow-hidden {isOpen ===
				id
					? 'max-h-lvh'
					: 'max-h-16 line-clamp-2'}"
			>
				{text}
			</div>

			{#if overflowStatus[id] || isOpen === id}
				<button
					transition:fade
					class="btn btn-xs"
					onclick={() => (isOpen = isOpen === id ? null : id)}
				>
					{isOpen === id ? 'Less' : 'Show more'}
					<ChevronDown
						size={12}
						class="duration-200 transition-transform {isOpen === id && 'rotate-180'}"
					/>
				</button>
			{/if}
		</div>
	{/if}
{/each}
