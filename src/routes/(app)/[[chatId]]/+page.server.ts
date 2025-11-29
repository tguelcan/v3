import type { PageServerLoad } from './$types';
import { findChatById } from '$server/services/chats';

export const load: PageServerLoad = async ({ params: {chatId} }) => {
	if (!chatId) return;
	return findChatById(chatId)
};