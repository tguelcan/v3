<script lang="ts">
	import { PressedKeys } from 'runed';
	import { EllipsisVertical, BadgePlus, X, Settings2 } from '@lucide/svelte';
	import { getChats } from '$remotes/chat.remote';
	import { onNavigate } from '$app/navigation';

	const keys = new PressedKeys();
	let showMenu = $state<boolean>(true);

	$effect(() => {
		if (keys.has('Escape')) {
			showMenu = false;
		}
		if (showMenu) {
			getChats().refresh();
		}
	});

	onNavigate(() => {
		showMenu = false;
	});
</script>

<div class="sticky top-0 md:top-2 md:px-3 max-w-4xl mx-auto w-full">
	<button
		class="btn btn-primary dark:btn-secondary text-left w-full"
		style="--btn-noise: 0"
		onclick={() => (showMenu = true)}
	>
		<div class="flex-1">
			<span class="font-bold">Assistant</span>
		</div>
		<div class="flex-none">
			<EllipsisVertical class="" size={14} />
		</div>
	</button>
</div>

{#snippet loader()}
	<ul class="w-full p-3 flex-1 space-y-2 *:skeleton *:rounded-lg *:h-8">
		<li class="w-5/6"></li>
		<li class="w-4/6"></li>
		<li class="w-4/5"></li>
		<li class="w-3/4"></li>
	</ul>
{/snippet}
<dialog id="navigation" class="modal" class:modal-open={showMenu}>
	<div class="modal-box p-0 mb-auto sm:mt-9 size-full rounded-none sm:rounded-box sm:h-auto">
		<div class="flex flex-col sm:flex-row h-full">
			<div class="sm:hidden flex justify-end p-2">
				<button class="btn btn-circle" onclick={() => (showMenu = false)}>
					<X size={16} />
				</button>
			</div>
			{#await getChats()}
				{@render loader()}
			{:then chats}
				<ul class="menu w-full flex-1 min-h-44">
					<li>
						<a href="/">
							<BadgePlus size={14} />
							New Chat</a
						>
					</li>
					{#each chats as { title, chatId } (chatId)}
						<li>
							<a href="/{chatId}" data-sveltekit-noscroll class="line-clamp-1 w-full"
								>{title || chatId}</a
							>
						</li>
					{/each}
				</ul>
			{/await}

			<div class="relative w-full sm:w-1/2 flex flex-col bg-primary">
				<ul class="menu text-neutral-content w-full z-10">
					<li>
						<a href="/settings">
							<Settings2 size={14} />
							Settings</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button onclick={() => (showMenu = false)}>close</button>
	</form>
</dialog>
