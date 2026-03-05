import { json, error } from '@sveltejs/kit';
import { checkBookmarkById } from '$lib/server/bookmarks/checker.js';

export const POST = async ({ params }) => {
	const updated = await checkBookmarkById(params.id);
	if (!updated) throw error(404, 'Not found');
	return json(updated);
};
