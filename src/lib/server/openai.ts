import { createOpenAI } from '@ai-sdk/openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export const mainModel = openai('gpt-5.1');
export const fastModel = openai('gpt-4-turbo');
