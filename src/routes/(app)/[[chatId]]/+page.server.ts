import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { findChatById } from '$server/services/chats';
import { getSession } from '$remotes/auth.remote';

/**
 * Page Server Load Function
 *
 * Loads chat data for the conversation view.
 *
 * Flow:
 * 1. Validates user authentication
 * 2. Redirects unauthenticated users to login
 * 3. Returns chat data if chatId is provided
 * 4. Returns empty for new chat creation
 *
 * @param params.chatId - Optional chat identifier from URL parameter
 * @returns Chat data with messages and metadata, or undefined for new chats
 * @throws Redirects to /login if user is not authenticated
 */
export const load: PageServerLoad = async ({ params: { chatId } }) => {
	// Authentication check - redirect if not logged in
	const session = await getSession();
	if (!session) redirect(302, '/login');

	// New chat: Return early to render empty conversation
	if (!chatId) return;

	// Existing chat: Fetch and return chat history
	return findChatById(chatId);
};
