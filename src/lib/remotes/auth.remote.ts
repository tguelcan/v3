import { redirect } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';
import { z } from 'zod/v4';
import { auth } from '$server/auth';
/**
 * Auth Remote Module
 *
 * Provides server-side authentication utilities for magic link login
 * and session management. Uses Better Auth for authentication handling.
 */

// Validation schema for email-based authentication
const authSchema = z.object({
	email: z.email()
});

/**
 * Magic Link Authentication Form Handler
 *
 * Sends a magic link to the user's email address for passwordless login.
 *
 * Flow:
 * 1. Validates email format via Zod schema
 * 2. Calls Better Auth API to send magic link
 * 3. Returns success/failure status
 *
 * @param email - User's email address for authentication
 * @returns Object with success boolean indicating operation result
 */
export const authForm = form(authSchema, async ({ email }) => {
	try {
		const { request } = getRequestEvent();

		// Send magic link via Better Auth API
		await auth.api.signInMagicLink({
			body: {
				email
			},
			// Session cookies are required for this endpoint
			headers: request.headers
		});

		// Return object with success true
		return { success: true };
	} catch {
		return { success: false };
	}
});

/**
 * Session Retrieval Query
 *
 * Fetches the current user's session from Better Auth.
 * Disables cookie cache to ensure fresh session data.
 *
 * @returns Session object if authenticated, null otherwise
 */
export const getSession = query(async () => {
	const { request } = getRequestEvent();

	// Retrieve session with cache disabled for fresh data
	const session = await auth.api.getSession({
		query: {
			disableCookieCache: true
		},
		headers: request.headers // pass the headers
	});
	return session;
});

export const deleteConfirmation = form(async () => {
	const { request } = getRequestEvent();

	try {
		const {
			session: { token }
		} = await auth.api.getSession({
			query: {
				disableCookieCache: true
			},
			headers: request.headers // pass the headers
		});

		await auth.api.deleteUser({
			body: {},
			headers: request.headers
		});
		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
});

export const logout = form(async () => {
	const { request } = getRequestEvent();

	// Retrieve session with cache disabled for fresh data
	await auth.api.signOut({
		query: {
			disableCookieCache: true
		},
		headers: request.headers // pass the headers
	});
	redirect(302, '/login');
});
