<script lang="ts">
	import { Chat } from '@ai-sdk/svelte';
	import { DefaultChatTransport } from 'ai';
	import { setChatContext } from '$utils/chat.svelte';

	let { data, children } = $props();

	const chat = new Chat({
		transport: new DefaultChatTransport({
			api: '/'
		}),
		get id() {
			return data?.chatId;
		},
		get messages() {
			return data?.messages;
		}
	});

	setChatContext(chat);
</script>

<div class="flex-1 flex flex-col {!chat?.messages?.length && 'justify-center'}">
	{@render children()}
</div>
