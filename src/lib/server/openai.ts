import { createOpenAI } from '@ai-sdk/openai';
import { env } from '$env/dynamic/private';

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY
});

export const mainModel = openai('gpt-5.1');
export const fastModel = openai('gpt-4-turbo');
