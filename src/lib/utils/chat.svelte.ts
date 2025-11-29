import { getContext, setContext } from 'svelte';
import { Chat } from '@ai-sdk/svelte';

const CHAT_CONTEXT_KEY = Symbol('chat');

export type ChatContext = Chat;

export const setChatContext = (chat: Chat): void => {
	setContext(CHAT_CONTEXT_KEY, chat);
};

export function useChatContext() {
	const chat = getContext<ChatContext>(CHAT_CONTEXT_KEY);

	if (!chat) {
		console.error('Context not found!');
		throw new Error('Chat context not found.');
	}

	return chat;
}

export const scrollIntoView = (node: HTMLLIElement, scroll: boolean) => {
	function update(scroll: boolean) {
		if (scroll)
			window.scrollTo({
				top: node.offsetTop - 90,
				behavior: 'smooth'
			});
	}
	update(scroll);
	return;
};
