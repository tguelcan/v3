<script lang="ts">
	import { fade } from 'svelte/transition';

	// Remotes
	import { authForm } from '$remotes/auth.remote';

	// Components
	import Claim from './Claim.svelte';
	import Legal from './Legal.svelte';
	import CheckYourEmails from '$components/CheckYourMails.svelte';

	const { email } = authForm.fields;
	let success = $derived<boolean | null>(authForm?.result?.success);
</script>

<div class="h-full flex flex-col justify-center items-center">
	<!-- Empty div for spacing -->
	<div class="mt-auto"></div>
	<div class="card w-full max-w-md">
		<div class="card-body">
			<Claim class="md:hidden" />
			<div class="hidden md:block">
				<div class="card-title text-3xl">Let's go</div>
				<p>Jump in and explore the possibilities...</p>
			</div>

			<div class="my-6 space-y-4 tooltip tooltip-bottom" data-tip="Coming soon...">
				<button class="btn btn-block opacity-50" disabled
					><img src="/img/google.svg" alt="Google Logo" class="inline-block w-5" /> Continue with Google</button
				>
				<button class="btn btn-block opacity-50" disabled>
					<img src="/img/linkedin.svg" alt="LinkedIn Logo" class="inline-block w-4 mr-1" />
					Continue with LinkedIn</button
				>
			</div>

			<div class="divider">OR</div>

			{#if success}
				<CheckYourEmails bind:success showBack />
			{:else}
				<form in:fade {...authForm} class="space-y-6">
					<!-- form content goes here -->
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Login with email</legend>
						<input {...email.as('email')} class="input w-full" placeholder="E-Mail" />
						{#if email.issues()}
							{#each email.issues() as issue, index (index)}
								<p class="label text-error">{issue.message}</p>
							{/each}
						{:else}
							<p class="label">You will receive a link for verification.</p>
						{/if}
					</fieldset>

					<button class="btn btn-block" disabled={authForm?.pending}>
						{#if authForm?.pending}
							<span class="loading loading-spinner"></span>
						{:else}
							Continue
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
	<div class="mt-auto">
		<Legal />
	</div>
</div>
