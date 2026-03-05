import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { rssFeeds } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const DELETE = async ({ params }) => {
	const deleted = await db.delete(rssFeeds).where(eq(rssFeeds.id, params.id)).returning();
	if (!deleted.length) throw error(404, 'Feed not found');
	return new Response(null, { status: 204 });
};

export const PATCH = async ({ params, request }) => {
	const body = await request.json();
	const { isActive, fetchIntervalMinutes } = body;

	const updates: Record<string, unknown> = {};
	if (typeof isActive === 'boolean') updates.isActive = isActive;
	if (fetchIntervalMinutes !== undefined) updates.fetchIntervalMinutes = fetchIntervalMinutes;

	const [row] = await db.update(rssFeeds).set(updates).where(eq(rssFeeds.id, params.id)).returning();
	if (!row) throw error(404, 'Not found');
	return json(row);
};
