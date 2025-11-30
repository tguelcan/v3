import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSession } from '$remotes/auth.remote';

/**
 * Login Page Server Load Function
 *
 * Prevents authenticated users from accessing the login page.
 *
 * Flow:
 * 1. Checks if user is already authenticated
 * 2. Redirects to home if session exists
 * 3. Returns empty object to render login page for unauthenticated users
 *
 * @returns Empty object to allow login page rendering
 * @throws Redirects to / if user is already authenticated
 */
export const load: PageServerLoad = async () => {
	// Check authentication status
	const session = await getSession();

	// Already logged in: Redirect to home page
	if (session) redirect(302, '/');

	// Not logged in: Render login page
	return {};
};
