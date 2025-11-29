<script lang="ts">
	import { TextareaAutosize } from 'runed';

	import { useChatContext } from '$utils/chat.svelte';
	import { beforeChat } from '$remotes/chat.remote';
	import { ArrowRight } from '@lucide/svelte';

	const chat = useChatContext();
	let { chatId, input } = beforeChat.fields;
	let textarea = $state<HTMLTextAreaElement>(null!);
	let form = $state<HTMLFormElement>(null!);
	let pending = $derived(chat.status === 'submitted' || chat.status === 'streaming');

	new TextareaAutosize({
		element: () => textarea,
		input: () => input.value(),
		maxHeight: 200
	});

	const sendMessage = async ({
		form,
		submit
	}: {
		form: HTMLFormElement;
		submit: () => Promise<void> | void;
	}): Promise<void> => {
		if (pending) return;
		// Backend validate & redirect
		await beforeChat.validate();
		const issues = beforeChat.fields.allIssues();
		if (issues?.length) {
			return;
		}

		const messageText = input.value();

		// Submit & reset form
		await submit();
		form.reset();

		// Send Message
		await chat.sendMessage({ text: messageText });
	};

	// Submit on Enter
	const onkeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			form?.requestSubmit();
			textarea?.focus();
		}
	};
</script>

{#snippet footer()}
	<div
		class="flex justify-end px-2 pb-2"
		role="button"
		tabindex="0"
		onkeydown={() => textarea.focus()}
		onclick={() => textarea.focus()}
	>
		<button
			type={chat?.status === 'ready' ? 'submit' : 'button'}
			onclick={chat?.stop}
			class="btn btn-sm btn-square"
			disabled={pending}
		>
			{#if pending}
				<span class="loading loading-spinner loading-xs"></span>
			{:else}
				<ArrowRight size={14} />
			{/if}
		</button>
	</div>
{/snippet}

<div id="composer" class="max-w-3xl mx-auto w-full sticky bottom-2 mt-4 px-2">
	<form
		{...beforeChat.enhance(sendMessage)}
		bind:this={form}
		class="bg-base-100 dark:bg-base-200 textarea focus-within:outline-0 w-full transition-colors rounded-box"
	>
		<input {...chatId.as('hidden', chat?.id)} />
		<textarea
			bind:this={textarea}
			{...input.as('text')}
			class="p-3 w-full focus:outline-0 min-h-12 resize-none"
			{onkeydown}
			placeholder="Write a message..."
		></textarea>
		{@render footer()}
	</form>
</div>
