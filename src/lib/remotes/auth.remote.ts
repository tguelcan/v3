import { form, getRequestEvent } from '$app/server';
import { z } from 'zod/v4';
import { auth } from '$server/auth';

export const authForm = form(
	z.object({
		email: z.email()
	}),
	async ({ email }) => {
		try {
			const { request } = await getRequestEvent();
			console.log('email');
			console.log(email);
			console.log(request.headers);
			const response = await auth.api.signInMagicLink({
				body: {
					email
				},
				// This endpoint requires session cookies.
				headers: request.headers
			});
			console.log('response');
			console.log(response);
			// Redirect to the newly created page
			//redirect(303, `/`);
			return { success: true };
		} catch (error) {
			console.log('---error');
			console.error(error);
			return { success: false };
		}
	}
);
