<script lang="ts">
	import { PressedKeys } from 'runed';

	// Components
	import CheckYourEmail from '$components/CheckYourMails.svelte';

	// Remotes
	import { deleteConfirmation } from '$lib/remotes/auth.remote';

	const keys = new PressedKeys();
	let showModal = $state<boolean>(false);
	let success = $derived<boolean | null>(deleteConfirmation?.result?.success);

	$effect(() => {
		if (keys.has('Escape')) {
			showModal = false;
		}
	});
</script>

<dialog id="delete_modal" class="modal modal-bottom sm:modal-middle" class:modal-open={showModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Delete your Profile</h3>
		<p class="py-4">
			Please confirm that you really want to start the process of deleting your profile.
			{#if success}
				<CheckYourEmail bind:success showBack={false} class="mt-4" />
			{:else}
				<span class="alert mt-4"
					>Please note that you will receive an email with a link that you must click on to confirm
					the deletion of your profile.</span
				>
			{/if}
		</p>
		<div class="modal-action">
			<button class="btn" onclick={() => (showModal = false)}>Close</button>
			{#if !success}
				<form {...deleteConfirmation}>
					<button class="btn btn-error" disabled={deleteConfirmation?.pending}>
						{#if deleteConfirmation?.pending}
							<span class="loading loading-spinner"></span>
						{:else}
							Delete
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button onclick={() => (showModal = false)}>close</button>
	</form>
</dialog>

<fieldset class="fieldset">
	<legend class="fieldset-legend">Account Deletion</legend>
	<div class="flex">
		<button class="btn" onclick={() => (showModal = true)}>Delete my account</button>
	</div>
	<p class="label">This action gives you the opportunity to irrevocably delete your account.</p>
</fieldset>
