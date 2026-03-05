import { db } from '$lib/server/db/index.js';
import { bookmarks } from '$lib/server/db/schema.js';
import { eq, isNull, or, lt } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';
import cron from 'node-cron';

export async function checkBookmarkUrl(url: string): Promise<{ statusCode: number; isAlive: boolean }> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 5000);
	try {
		const res = await fetch(url, { method: 'HEAD', signal: controller.signal, redirect: 'follow' });
		return { statusCode: res.status, isAlive: res.status >= 200 && res.status < 400 };
	} catch {
		return { statusCode: 0, isAlive: false };
	} finally {
		clearTimeout(timeout);
	}
}

export async function checkBookmarkById(id: string) {
	const [bookmark] = await db.select().from(bookmarks).where(eq(bookmarks.id, id));
	if (!bookmark) return null;

	const result = await checkBookmarkUrl(bookmark.url);
	const ts = now();

	const [updated] = await db
		.update(bookmarks)
		.set({ ...result, statusCheckedAt: ts, updatedAt: ts })
		.where(eq(bookmarks.id, id))
		.returning();
	return updated;
}

async function checkAllBookmarks() {
	// Only check bookmarks not checked in last 6h
	const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
	const rows = await db
		.select()
		.from(bookmarks)
		.where(or(isNull(bookmarks.statusCheckedAt), lt(bookmarks.statusCheckedAt, sixHoursAgo)));

	// Process in chunks of 5
	for (let i = 0; i < rows.length; i += 5) {
		const chunk = rows.slice(i, i + 5);
		await Promise.all(
			chunk.map(async (b) => {
				const result = await checkBookmarkUrl(b.url);
				const ts = now();
				await db
					.update(bookmarks)
					.set({ ...result, statusCheckedAt: ts, updatedAt: ts })
					.where(eq(bookmarks.id, b.id));
			})
		);
	}
}

export function startBookmarkChecker() {
	// Every 6 hours
	cron.schedule('0 */6 * * *', () => {
		checkAllBookmarks().catch(console.error);
	});
}
