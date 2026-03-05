import cron from 'node-cron';
import { db } from '$lib/server/db/index.js';
import { rssFeeds } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { fetchFeed, pruneOldItems } from './fetcher.js';

let started = false;

export function startRssScheduler() {
	if (started) return;
	started = true;

	// Every 15 minutes: fetch active feeds that are due
	cron.schedule('*/15 * * * *', async () => {
		try {
			const feeds = await db.select().from(rssFeeds).where(eq(rssFeeds.isActive, true));
			const now = Date.now();
			for (const feed of feeds) {
				const intervalMs = (feed.fetchIntervalMinutes ?? 15) * 60 * 1000;
				const lastFetched = feed.lastFetchedAt ? new Date(feed.lastFetchedAt).getTime() : 0;
				if (now - lastFetched >= intervalMs) {
					await fetchFeed(feed.id);
				}
			}
		} catch (err) {
			console.error('RSS scheduler error:', err);
		}
	});

	// Daily at 3am: prune old items
	cron.schedule('0 3 * * *', () => {
		pruneOldItems().catch(console.error);
	});

	console.log('RSS scheduler started');
}
