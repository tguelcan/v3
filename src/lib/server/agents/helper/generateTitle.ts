import { ToolLoopAgent } from 'ai';
import { fastModel } from '$server/openai';
import instructions from './generateTitle.md?raw';

const agent = new ToolLoopAgent({
	model: fastModel,
	instructions
});

export default agent;
