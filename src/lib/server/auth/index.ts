import { getRequestEvent } from '$app/server';

// Better auth
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { magicLink } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';

// Resend
import resend from '$server/resend';

import { env } from '$env/dynamic/private';
import db, { client } from './../mongodb';

export const auth = betterAuth({
	baseURL: env.BASE_URL,
	plugins: [
		sveltekitCookies(getRequestEvent),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				// Implement your own email sending logic here
				console.log(`Sending magic link to ${email}: ${url}`);
				await resend.emails.send({
					from: 'Magic Link <no-reply@sobmit.com>',
					to: email,
					template: {
						id: 'd6359b4c-cd7b-49e1-bb88-2888587fb44f',
						variables: {
							url
						}
					}
				});
			}
		})
	],
	experimental: { joins: true },
	database: mongodbAdapter(db, {
		// Optional: if you don't provide a client, database transactions won't be enabled.
		client
	})
});
