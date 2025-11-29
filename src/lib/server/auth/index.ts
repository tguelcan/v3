import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import db, { client } from './../mongodb';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true
	},
	plugins: [sveltekitCookies(getRequestEvent)],
	experimental: { joins: true },
	database: mongodbAdapter(db, {
		// Optional: if you don't provide a client, database transactions won't be enabled.
		client
	})
});
