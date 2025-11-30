import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$server/auth';
import { building } from '$app/environment';

const logHandle: Handle = async ({ event, resolve }) => {
	const requestTime: number = Date.now();
	const response = await resolve(event);
	const responseTime: number = Date.now();
	console.log(
		`${event.request.method}: ${event.url.pathname} - ${response.status} (${responseTime - requestTime}ms)`
	);
	return response;
};

const authHandle: Handle = ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

const mainHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	// Make session and user available on server
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return response;
};

export const handle = sequence(logHandle, authHandle, mainHandle);
