import type { UIMessage } from 'ai';
import { EJSON, type ObjectId } from 'bson';

import db from '$server/mongodb';

type Chat = {
	_id: ObjectId;
	chatId: string;
	title?: string;
	messages: UIMessage[];
};

const collection = db.collection<Chat>('chats');

export const findChats = async () => {
	const result = await collection
		.find({})
		.limit(4)
		.sort({ _id: -1 })
		.project({ title: 1, chatId: 1, _id: 0 })
		.toArray();
	return EJSON.serialize(result) as Chat[];
};

export const findChatById = async (chatId: string) => {
	const result = await collection.findOne({ chatId });
	return EJSON.serialize(result) as Chat | undefined;
};

export const upsertChat = async ({
	id,
	messages,
	title
}: {
	id: string;
	messages?: UIMessage[];
	title?: string;
}) =>
	collection.updateOne(
		{
			chatId: id
		},
		{
			$set: {
				createdAt: new Date(),
				chatId: id,
				messages
			},
			$setOnInsert: {
				title
			}
		},
		{
			upsert: true
		}
	);

export const deleteChatById = async (chatId: string) => collection.deleteOne({ chatId });
