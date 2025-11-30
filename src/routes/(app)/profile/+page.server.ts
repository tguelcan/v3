import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { getSession } from '$remotes/auth.remote';

/**
 * Profile Page Server Load Function
 *
 * Protects the profile page from unauthorized access.
 *
 * Flow:
 * 1. Validates user authentication
 * 2. Redirects unauthenticated users to login
 * 3. Allows authenticated users to access settings
 *
 * @returns Empty object - profile data is handled client-side
 * @throws Redirects to /login if user is not authenticated
 */
export const load: PageServerLoad = async () => {
	// Authentication gate - only logged-in users can access profile
	const session = await getSession();
	if (!session) redirect(302, '/login');
	return session.user;
};
