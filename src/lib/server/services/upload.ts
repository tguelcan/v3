import { GridFSBucket, ObjectId } from 'mongodb';
import { EJSON } from 'bson';

// import { Readable } from 'stream';

import db from '$server/mongodb';

// Initialize the GridFS Bucket
// 'uploads' is the default bucket namespace (fs.files, fs.chunks)
const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

/**
 * Type definition for file metadata stored in GridFS
 */
export type GridFile = {
	_id: ObjectId;
	length: number;
	chunkSize: number;
	uploadDate: Date;
	filename: string;
	contentType?: string;
	metadata?: Record<string, any>;
};

// MongoDB collection reference for chat documents
const collection = db.collection<GridFile>('uploads.files');

/**
 * Upload File to GridFS (Direct Buffer Method)
 *
 * Uploads a file buffer directly without creating a Readable stream wrapper.
 * Writes the buffer content immediately to the GridFS bucket.
 *
 * Flow:
 * 1. Open upload stream to GridFS
 * 2. Write buffer to stream and close it (.end)
 * 3. Resolve promise on 'finish' event
 *
 * @param fileBuffer - The binary data of the file (Buffer)
 * @param filename - Name of the file
 * @param contentType - MIME type
 * @returns Promise<GridFile> The uploaded file metadata object
 */
export const uploadFile = async (
	fileBuffer: Buffer,
	filename: string,
	contentType: string
): Promise<GridFile> => {
	return new Promise((resolve, reject) => {
		// Open the upload stream directly
		const uploadStream = bucket.openUploadStream(filename, {
			contentType,
			metadata: { contentType }
		});

		// Listen to completion
		uploadStream.on('finish', async () => {
			const fileDoc = await collection.findOne({ _id: uploadStream.id });
			resolve(EJSON.serialize(fileDoc) as GridFile);
		});

		// Listen for errors
		uploadStream.on('error', (error) => {
			reject(error);
		});

		// DIRECT WRITE: Write the buffer and close the stream in one go
		uploadStream.end(fileBuffer);
	});
};

/**
 * Find File Metadata by ID
 *
 * Retrieves the metadata of a file (without the binary content).
 * Useful for checking existence or getting content-type headers before streaming.
 *
 * @param fileId - The GridFS file ObjectId (string format)
 * @returns Promise<GridFile | null> File metadata or null
 */
export const findFileMetadataById = async (fileId: string) => {
	const _id = new ObjectId(fileId);
	console.log(_id);
	// We query the internal 'files' collection of the bucket
	const result = await collection.findOne({ _id });

	if (!result) {
		return null;
	}

	return EJSON.serialize(result) as GridFile | null;
};

/**
 * Download File Stream
 *
 * Returns a readable stream for the file content.
 * This stream can be piped directly to an HTTP response.
 *
 * Flow:
 * 1. Convert string ID to ObjectId
 * 2. Open download stream from bucket
 *
 * @param fileId - The GridFS file ObjectId (string format)
 * @returns GridFSBucketReadStream Readable stream of the file content
 */
export const getFileStreamById = (fileId: string) => {
	return bucket.openDownloadStream(new ObjectId(fileId));
};

/**
 * Delete File by ID
 *
 * Permanently removes a file and its chunks from GridFS.
 *
 * @param fileId - The GridFS file ObjectId (string format)
 * @returns Promise<void>
 */
export const deleteFileById = async (fileId: string) => {
	await bucket.delete(new ObjectId(fileId));
};
