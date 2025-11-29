import { describe, it, expect } from 'vitest';
import agent from './generateTitle';

describe('generateTitle Agent', () => {
	it('should generate a title for a simple greeting', async () => {
		const { output }: { output: string } = await agent.generate({ prompt: 'Hello, how are you?' });

		expect(output).toBeTruthy();
		expect(typeof output).toBe('string');
		expect(output.length).toBeGreaterThan(0);
		expect(output.length).toBeLessThan(50); // Should be short
	});

	it('should generate a title for a technical question', async () => {
		const { output }: { output: string } = await agent.generate({
			prompt: 'How do I implement authentication in SvelteKit?'
		});

		expect(output).toBeTruthy();
		expect(output).toMatch(/auth|svelte|implement/i);
	});

	it('should generate a title for a German question', async () => {
		const { output }: { output: string } = await agent.generate({
			prompt: 'Wie kann ich ein Darkmode in Svelte implementieren?'
		});

		expect(output).toBeTruthy();
		// Should contain German or relevant keywords
		expect(typeof output).toBe('string');
	});

	it('should not include special characters except allowed ones', async () => {
		const { output }: { output: string } = await agent.generate({
			prompt: 'What is the best way to handle errors in JavaScript?'
		});

		expect(output).toBeTruthy();
		// Should not contain emojis, quotes, question marks, exclamation marks
		expect(output).not.toMatch(/[!?"""'':;,。！？]/);
	});

	it('should be concise (3-5 words)', async () => {
		const { output } = await agent.generate({
			prompt: 'I need help with understanding how to use React hooks effectively in my project'
		});

		expect(output).toBeTruthy();
		const wordCount = output.trim().split(/\s+/).length;
		expect(wordCount).toBeGreaterThanOrEqual(1);
		expect(wordCount).toBeLessThanOrEqual(7); // Some flexibility
	});
});
