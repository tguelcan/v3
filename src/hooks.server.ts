import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const requestTime: number = Date.now();
	const response = await resolve(event);
	const responseTime: number = Date.now();
	console.log(
		`${event.request.method}: ${event.url.pathname} - ${response.status} (${responseTime - requestTime}ms)`
	);
	return response;
};
