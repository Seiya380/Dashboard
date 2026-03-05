import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { bookmarks } from '$lib/server/db/schema.js';
import { desc } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';

export const GET = async () => {
	const rows = await db.select().from(bookmarks).orderBy(desc(bookmarks.createdAt));
	return json(rows);
};

export const POST = async ({ request }) => {
	const body = await request.json();
	const { url, title, description, tags } = body;
	if (!url?.trim() || !title?.trim()) return json({ error: 'URL and title required' }, { status: 400 });

	const id = crypto.randomUUID();
	const ts = now();
	const [row] = await db
		.insert(bookmarks)
		.values({
			id,
			url: url.trim(),
			title: title.trim(),
			description,
			tags: tags ? JSON.stringify(tags) : null,
			createdAt: ts,
			updatedAt: ts
		})
		.returning();
	return json(row, { status: 201 });
};
