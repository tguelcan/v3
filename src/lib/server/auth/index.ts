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
	user: {
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url }) => {
				console.log(`Sending delete confirmation to ${user.email}`);
				await resend.emails.send({
					to: user?.email,
					template: {
						id: '27630d9c-2092-410f-bf07-fba21b43ad0e',
						variables: {
							url
						}
					}
				});
			}
		}
	},
	plugins: [
		sveltekitCookies(getRequestEvent),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				// Implement your own email sending logic here
				console.log(`Sending magic link to ${email}: ${url}`);
				await resend.emails.send({
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

export const getUser = async ({ headers }) => {
	const { user } = await auth.api.getSession({
		query: {
			disableCookieCache: true
		},
		headers
	});
	return user;
};
