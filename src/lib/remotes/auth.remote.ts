import { form } from '$app/server';
import { z } from 'zod/v4';
import { redirect } from '@sveltejs/kit';
import { auth } from '$server/auth';

export const authForm = form(
	z.object({
		email: z.email(),
		password: z.string().min(8).max(100),
		name: z.string()
	}),
	async ({ email, password, name }) => {
		console.log(email);
		console.log(password);
		console.log(name);
		const response = await auth.api.signUpEmail({
			body: {
				email,
				password
			},
			asResponse: true // returns a response object instead of data
		});
		console.log(response);
		// Redirect to the newly created page
		redirect(303, `/`);
	}
);
