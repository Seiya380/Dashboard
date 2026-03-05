import Parser from 'rss-parser';
import { d as db, r as rssFeeds, a as rssItems } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';

const parser = new Parser({
  timeout: 1e4,
  headers: { "User-Agent": "Dashboard-RSS/1.0" }
});
async function fetchFeed(feedId) {
  const [feed] = await db.select().from(rssFeeds).where(eq(rssFeeds.id, feedId));
  if (!feed || !feed.isActive) return;
  const headers = {
    "User-Agent": "Dashboard-RSS/1.0"
  };
  if (feed.lastEtag) headers["If-None-Match"] = feed.lastEtag;
  if (feed.lastModified) headers["If-Modified-Since"] = feed.lastModified;
  try {
    const res = await fetch(feed.url, { headers });
    if (res.status === 304) {
      await db.update(rssFeeds).set({ lastFetchedAt: now() }).where(eq(rssFeeds.id, feedId));
      return;
    }
    const etag = res.headers.get("etag");
    const lastModified = res.headers.get("last-modified");
    const text = await res.text();
    const parsed = await parser.parseString(text);
    const fetchedAt = now();
    for (const item of parsed.items) {
      const itemId = item.guid || item.link || `${feedId}-${item.title}`;
      if (!itemId) continue;
      await db.insert(rssItems).values({
        id: itemId,
        feedId,
        title: item.title ?? "Untitled",
        link: item.link,
        description: item.contentSnippet ?? item.content ?? item.summary,
        author: item.creator ?? item.author,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : null,
        fetchedAt
      }).onConflictDoNothing();
    }
    await db.update(rssFeeds).set({
      lastFetchedAt: fetchedAt,
      lastEtag: etag,
      lastModified,
      title: parsed.title ?? feed.title,
      siteUrl: parsed.link ?? feed.siteUrl
    }).where(eq(rssFeeds.id, feedId));
  } catch (err) {
    console.error(`RSS fetch error for ${feed.url}:`, err);
  }
}
async function addFeed(url) {
  let title = url;
  let siteUrl;
  try {
    const parsed = await parser.parseURL(url);
    title = parsed.title ?? url;
    siteUrl = parsed.link;
  } catch {
  }
  const id = crypto.randomUUID();
  const ts = now();
  const [row] = await db.insert(rssFeeds).values({ id, url, title, siteUrl, isActive: true, createdAt: ts }).returning();
  await fetchFeed(id);
  return row;
}
async function pruneOldItems() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString();
  db.$client.prepare(`DELETE FROM rss_items WHERE fetched_at < ? AND is_saved = 0`).run(sevenDaysAgo);
}

export { addFeed as a, fetchFeed as f, pruneOldItems as p };
//# sourceMappingURL=fetcher-C-M3E2v1.js.map
