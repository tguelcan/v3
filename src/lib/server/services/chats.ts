import type { UIMessage } from 'ai';
import { EJSON, type ObjectId } from 'bson';

import db from '$server/mongodb';

/**
 * Chat Service Module
 *
 * Provides database operations for chat management.
 * Handles CRUD operations for chat conversations with MongoDB.
 */

/**
 * Chat document structure stored in MongoDB
 */
type Chat = {
	_id: ObjectId;
	chatId: string;
	title?: string;
	messages: UIMessage[];
};

// MongoDB collection reference for chat documents
const collection = db.collection<Chat>('chats');

/**
 * Find Recent Chats
 *
 * Retrieves the 4 most recent chats for display in the chat list sidebar.
 * Returns only essential fields (title, chatId) for performance.
 *
 * Flow:
 * 1. Query all chats without filters
 * 2. Sort by creation date (newest first)
 * 3. Limit to 4 results
 * 4. Project only required fields (exclude messages)
 * 5. Serialize to EJSON for cross-platform compatibility
 *
 * @returns Promise<Chat[]> Array of recent chats with title and chatId only
 */
export const findChats = async () => {
	const result = await collection
		.find({})
		.limit(4)
		.sort({ _id: -1 })
		.project({ title: 1, chatId: 1, _id: 0 })
		.toArray();
	return EJSON.serialize(result) as Chat[];
};

/**
 * Find Chat by ID
 *
 * Retrieves a complete chat conversation including all messages.
 *
 * @param chatId - Unique identifier for the chat
 * @returns Promise<Chat | undefined> Complete chat object or undefined if not found
 */
export const findChatById = async (chatId: string) => {
	const result = await collection.findOne({ chatId });
	return EJSON.serialize(result) as Chat | undefined;
};

/**
 * Upsert Chat
 *
 * Creates a new chat or updates an existing one.
 * Uses MongoDB's upsert operation for atomic create-or-update behavior.
 *
 * Flow:
 * 1. Match by chatId
 * 2. Update messages and timestamp ($set)
 * 3. Set title only on first insert ($setOnInsert)
 * 4. Create document if it doesn't exist (upsert: true)
 *
 * Note: Title is only set on initial creation to preserve user-edited titles.
 *
 * @param id - Unique chat identifier
 * @param messages - Array of UI messages in the conversation
 * @param title - Chat title (only used for new chats)
 * @returns Promise<UpdateResult> MongoDB update operation result
 */
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

/**
 * Delete Chat by ID
 *
 * Permanently removes a chat conversation from the database.
 *
 * @param chatId - Unique identifier of the chat to delete
 * @returns Promise<DeleteResult> MongoDB delete operation result
 */
export const deleteChatById = async (chatId: string) => collection.deleteOne({ chatId });
