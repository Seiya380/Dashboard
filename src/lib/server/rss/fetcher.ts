import Parser from 'rss-parser';
import { db } from '$lib/server/db/index.js';
import { rssFeeds, rssItems } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';

const parser = new Parser({
	timeout: 10000,
	headers: { 'User-Agent': 'Dashboard-RSS/1.0' }
});

export async function fetchFeed(feedId: string) {
	const [feed] = await db.select().from(rssFeeds).where(eq(rssFeeds.id, feedId));
	if (!feed || !feed.isActive) return;

	const headers: Record<string, string> = {
		'User-Agent': 'Dashboard-RSS/1.0'
	};
	if (feed.lastEtag) headers['If-None-Match'] = feed.lastEtag;
	if (feed.lastModified) headers['If-Modified-Since'] = feed.lastModified;

	try {
		// Use raw fetch for conditional headers, then parse
		const res = await fetch(feed.url, { headers });
		if (res.status === 304) {
			// Not modified
			await db.update(rssFeeds).set({ lastFetchedAt: now() }).where(eq(rssFeeds.id, feedId));
			return;
		}

		const etag = res.headers.get('etag');
		const lastModified = res.headers.get('last-modified');
		const text = await res.text();

		const parsed = await parser.parseString(text);

		// Upsert items
		const fetchedAt = now();
		for (const item of parsed.items) {
			const itemId = item.guid || item.link || `${feedId}-${item.title}`;
			if (!itemId) continue;
			await db
				.insert(rssItems)
				.values({
					id: itemId,
					feedId,
					title: item.title ?? 'Untitled',
					link: item.link,
					description: item.contentSnippet ?? item.content ?? item.summary,
					author: item.creator ?? item.author,
					publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : null,
					fetchedAt
				})
				.onConflictDoNothing();
		}

		// Update feed metadata
		await db
			.update(rssFeeds)
			.set({
				lastFetchedAt: fetchedAt,
				lastEtag: etag,
				lastModified: lastModified,
				title: parsed.title ?? feed.title,
				siteUrl: parsed.link ?? feed.siteUrl
			})
			.where(eq(rssFeeds.id, feedId));
	} catch (err) {
		console.error(`RSS fetch error for ${feed.url}:`, err);
	}
}

export async function addFeed(url: string): Promise<typeof rssFeeds.$inferSelect> {
	// Parse first to get title
	let title = url;
	let siteUrl: string | undefined;
	try {
		const parsed = await parser.parseURL(url);
		title = parsed.title ?? url;
		siteUrl = parsed.link;
	} catch {
		// Use URL as title fallback
	}

	const id = crypto.randomUUID();
	const ts = now();
	const [row] = await db
		.insert(rssFeeds)
		.values({ id, url, title, siteUrl, isActive: true, createdAt: ts })
		.returning();

	// Fetch immediately (awaited so articles are ready when the response returns)
	await fetchFeed(id);
	return row;
}

export async function pruneOldItems() {
	const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
	(db as any).$client
		.prepare(`DELETE FROM rss_items WHERE fetched_at < ? AND is_saved = 0`)
		.run(sevenDaysAgo);
}
