<script lang="ts">
	import { useChatContext, scrollIntoView } from '$utils/chat.svelte';

	import User from '$parts/User.svelte';
	import Text from '$parts/Text.svelte';

	const chat = useChatContext();
</script>

{#if chat?.messages?.length}
	<ul class="w-full max-w-3xl mx-auto">
		{#each chat.messages as message, messageIndex (messageIndex)}
			{@const lastMessage = messageIndex === chat.messages.length - 1}
			<li
				use:scrollIntoView={chat.status === 'streaming'}
				class={lastMessage ? 'min-h-[calc(100vh-11.5rem)]' : ''}
			>
				<User {message} class="max-w-3xl mx-auto px-3 py-6" />
				<Text {message} class="max-w-3xl mx-auto px-3" />
			</li>
		{/each}
	</ul>
{/if}
