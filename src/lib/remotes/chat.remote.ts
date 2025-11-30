import { form, query, getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { findChats } from '$server/services/chats';
import z from 'zod/v4';

/**
 * Zod validation schema for chat form submissions
 * Ensures chatId and user input are non-empty strings
 */
const schema = z.object({
	chatId: z.string().min(1),
	input: z.string().min(1)
});

/**
 * Before Chat Form Handler
 *
 * Handles pre-chat navigation logic to ensure users are on the correct chat route.
 *
 * Flow:
 * 1. Validates form data (chatId, input)
 * 2. Checks if user is already on the chat page
 * 3. Redirects to specific chat route if needed
 *
 * Use Case: Called before sending a message to navigate to the chat page
 * if the user is on the home page or a different chat.
 *
 * @param chatId - The target chat identifier
 * @returns Early return if already on correct chat page
 * @throws Redirects to /{chatId} if navigation is needed
 */
export const beforeChat = form(schema, ({ chatId }) => {
	const { params } = getRequestEvent();

	// Already on the chat page: No redirect needed
	if (params?.chatId) return;

	// Navigate to the specific chat route
	redirect(302, `/${chatId}`);
});

/**
 * Get Chats Query
 *
 * Retrieves all chats for the current user from the database.
 *
 * @returns Promise<Chat[]> Array of chat objects with messages and metadata
 */
export const getChats = query(findChats);
