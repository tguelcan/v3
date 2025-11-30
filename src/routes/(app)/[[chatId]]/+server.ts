import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { error } from '@sveltejs/kit';
import { upsertChat } from '$server/services/chats';
import { mainModel } from '$server/openai';
import generateTitle from '$server/agents/helper/generateTitle';
import { getSession } from '$remotes/auth.remote';

/**
 * POST /[[chatId]]
 *
 * Handles chat message streaming for the AI assistant.
 *
 * Flow:
 * 1. Validates user session
 * 2. Processes incoming messages
 * 3. Streams AI response in real-time
 * 4. Persists chat history to database
 * 5. Generates title automatically for new conversations
 *
 * @param request - Contains messages array and chat ID
 * @returns Stream response with AI-generated messages
 * @throws 401 - If user is not authenticated
 */
export async function POST({ request }) {
	// Session validation
	const session = await getSession();
	if (!session) {
		error(401, 'Unauthorized');
	}

	// Extract request payload
	const { messages = [], id }: { messages: UIMessage[] | undefined; id: string } =
		await request.json();

	// Detect initial message to trigger title generation
	const isInitialMessage = messages.length <= 2;

	// Initialize AI streaming response
	const result = streamText({
		model: mainModel,
		messages: convertToModelMessages(messages)
	});

	// Stream response to client with persistence callback
	return result.toUIMessageStreamResponse({
		originalMessages: messages,
		onFinish: async ({ messages }) => {
			if (isInitialMessage) {
				// New conversation: Generate title asynchronously and save
				generateTitle.generate({ prompt: JSON.stringify(messages) }).then(({ output }) => {
					upsertChat({ id, messages, title: output });
				});
			} else {
				// Existing conversation: Update messages only
				upsertChat({ id, messages });
			}
		}
	});
}
