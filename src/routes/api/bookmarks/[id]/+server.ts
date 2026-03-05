import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { bookmarks } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';

export const PATCH = async ({ params, request }) => {
	const body = await request.json();
	const { title, description, tags, url } = body;

	const updates: Record<string, unknown> = { updatedAt: now() };
	if (title !== undefined) updates.title = title;
	if (description !== undefined) updates.description = description;
	if (url !== undefined) updates.url = url;
	if (tags !== undefined) updates.tags = JSON.stringify(tags);

	const [row] = await db.update(bookmarks).set(updates).where(eq(bookmarks.id, params.id)).returning();
	if (!row) throw error(404, 'Not found');
	return json(row);
};

export const DELETE = async ({ params }) => {
	await db.delete(bookmarks).where(eq(bookmarks.id, params.id));
	return new Response(null, { status: 204 });
};
