import { env } from '$env/dynamic/private';
import { z } from 'zod/v4';
import sharp from 'sharp';
import { command, getRequestEvent, form } from '$app/server';
import { uploadFile, deleteFileById } from '$server/services/upload';
import { auth, getUser } from '$server/auth';

export const updateProfile = command(z.string(), async (id) => {
	try {
		// Return object with success true
		return { success: true };
	} catch {
		return { success: false };
	}
});

const imageUploadSchema = z.object({
	file: z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
		message: 'File must be an image'
	})
});

export const uploadImage = form(imageUploadSchema, async ({ file }) => {
	const { request } = getRequestEvent();

	const arrayBuffer = await file.arrayBuffer();
	// Resize image to 320x320
	const resizedImage = await sharp(arrayBuffer).resize(320, 320).png().toBuffer();
	const fileBuffer = Buffer.from(resizedImage);

	const result = await uploadFile(fileBuffer, file.name, file.type);

	if (result?._id) {
		await auth.api.updateUser({
			body: {
				image: result?._id['$oid']
			},
			headers: request.headers
		});
	}

	return result;
});

export const removeImage = command(async () => {
	const { request } = getRequestEvent();
	const user = await getUser(request);
	try {
		await auth.api.updateUser({
			body: {
				image: null
			},
			headers: request.headers
		});
		await deleteFileById(user.image);

		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
});
