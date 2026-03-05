import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { rssFeeds } from '$lib/server/db/schema.js';
import { addFeed } from '$lib/server/rss/fetcher.js';

export const GET = async () => {
	const rows = await db.select().from(rssFeeds);
	return json(rows);
};

export const POST = async ({ request }) => {
	const body = await request.json();
	const { url } = body;
	if (!url?.trim()) return json({ error: 'URL required' }, { status: 400 });

	try {
		const feed = await addFeed(url.trim());
		return json(feed, { status: 201 });
	} catch (err) {
		return json({ error: 'Failed to add feed' }, { status: 500 });
	}
};
