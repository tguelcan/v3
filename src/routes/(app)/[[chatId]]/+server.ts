import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { upsertChat } from '$server/services/chats';
import { mainModel } from '$server/openai';
import generateTitle from '$server/agents/helper/generateTitle';
export async function POST({ request }) {
	const { messages = [], id }: { messages: UIMessage[] | undefined; id: string } =
		await request.json();

	const isInitialMessage = messages.length <= 2;

	const result = streamText({
		model: mainModel,
		messages: convertToModelMessages(messages)
	});

	return result.toUIMessageStreamResponse({
		originalMessages: messages,
		onFinish: async ({ messages }) => {
			if (isInitialMessage) {
				// Generate initial title
				generateTitle.generate({ prompt: JSON.stringify(messages) }).then(({ output }) => {
					upsertChat({ id, messages, title: output });
				});
			} else {
				upsertChat({ id, messages });
			}
		}
	});
}
