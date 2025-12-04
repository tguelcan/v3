import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFileStreamById, findFileMetadataById } from '$server/services/upload'; // Pfad anpassen

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	try {
		// 1. Find file metadata by ID
		const file = await findFileMetadataById(id);

		if (!file) {
			throw error(404, 'Image not found');
		}

		// 2. Get Stream from GridFS
		const stream = getFileStreamById(id);

		// 3. Response as Stream
		return new Response(stream as any, {
			headers: {
				// Wichtig: Browser muss wissen, dass es ein Bild ist
				'Content-Type': file.metadata?.contentType || 'application/octet-stream',

				// Optional: Caching for performance (e.g., 1 week)
				'Cache-Control': 'public, max-age=604800, immutable'
			}
		});
	} catch (err) {
		console.error('Image load error:', err);
		throw error(404, 'Datei konnte nicht geladen werden');
	}
};
