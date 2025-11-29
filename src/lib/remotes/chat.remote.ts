import { form, query, getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { findChats } from '$server/services/chats';
import z from 'zod/v4';

const schema = z.object({
	chatId: z.string().min(1),
	input: z.string().min(1)
});

export const beforeChat = form(schema, ({ chatId }) => {
	const { params } = getRequestEvent();
	if (params?.chatId) return;
	redirect(302, `/${chatId}`);
});

export const getChats = query(findChats);
