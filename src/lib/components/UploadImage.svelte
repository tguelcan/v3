<script lang="ts">
	import { PressedKeys } from 'runed';
	import { uploadImage, removeImage } from '$remotes/profile.remote';
	import { invalidateAll } from '$app/navigation';
	// Remotes
	// import { deleteConfirmation } from '$lib/remotes/auth.remote';

	const keys = new PressedKeys();
	let { show = $bindable(), image } = $props<{
		show: boolean;
		image?: string | null | undefined;
	}>();

	// States
	let formField: HTMLFormElement | null = $state(null);
	let removeImagePending = $state<boolean>(false);
	//	let success = $derived<boolean | null>(deleteConfirmation?.result?.success);

	$effect(() => {
		if (keys.has('Escape')) {
			show = false;
		}

		if (uploadImage?.result) {
			// Update Profile
			show = false;
		}
	});
</script>

<dialog id="delete_modal" class="modal modal-bottom sm:modal-middle" class:modal-open={show}>
	<div class="modal-box">
		<h3 class="card-title">Upload Image</h3>
		<p class="py-4">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, reprehenderit?
		</p>
		{#if !formField?.pending}
			<form {...uploadImage} enctype="multipart/form-data" bind:this={formField}>
				<input
					{...uploadImage.fields.file.as('file')}
					class="file-input w-full"
					onchange={() => formField?.requestSubmit()}
				/>
			</form>
		{:else}
			<div class="w-full flex justify-center">
				<span class="loading loading-spinner"></span>
			</div>
		{/if}
		<div class="modal-action">
			<!-- Delete image function -->
			{#if image}
				<button
					type="button"
					class="btn btn-error"
					onclick={async () => {
						removeImagePending = true;
						await removeImage();
						removeImagePending = false;
						show = false;
						await invalidateAll();
					}}
				>
					{#if removeImagePending}
						<span class="loading loading-spinner loading-xs"></span>
					{:else}
						Delete Image
					{/if}
				</button>
			{/if}
			<button class="btn" onclick={() => (show = false)}>Close</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button onclick={() => (show = false)}>close</button>
	</form>
</dialog>
