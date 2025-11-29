<script lang="ts">
	import { useChatContext } from '$utils/chat.svelte';

	const chat = useChatContext();
	const hasMessages = $derived<boolean>(Boolean(chat?.messages?.length));
</script>

{#if !hasMessages}
	<div class="max-w-3xl mx-auto w-full p-3">
		<div class="text-3xl font-serif select-none">
			Keep things
			<div class="text-rotate">
				<span>
					<span>simple.</span>
					<span>easy.</span>
					<span>interesting.</span>
				</span>
			</div>
		</div>
	</div>
{/if}
