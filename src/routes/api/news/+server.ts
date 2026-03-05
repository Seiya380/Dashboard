import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { rssItems } from '$lib/server/db/schema.js';
import { desc } from 'drizzle-orm';

export const GET = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit') ?? 50);
	const rows = await db.select().from(rssItems).orderBy(desc(rssItems.publishedAt)).limit(limit);
	return json(rows);
};
