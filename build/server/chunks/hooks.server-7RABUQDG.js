import cron from 'node-cron';
import { d as db, r as rssFeeds } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { f as fetchFeed, p as pruneOldItems } from './fetcher-C-M3E2v1.js';
import { s as startBookmarkChecker } from './checker-CqUvwaAs.js';
import { s as startIcsScheduler } from './ics-sync-D7cRs-DF.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'rss-parser';
import './dates-CjMa0hVO.js';

let started = false;
function startRssScheduler() {
  if (started) return;
  started = true;
  cron.schedule("*/15 * * * *", async () => {
    try {
      const feeds = await db.select().from(rssFeeds).where(eq(rssFeeds.isActive, true));
      const now = Date.now();
      for (const feed of feeds) {
        const intervalMs = (feed.fetchIntervalMinutes ?? 15) * 60 * 1e3;
        const lastFetched = feed.lastFetchedAt ? new Date(feed.lastFetchedAt).getTime() : 0;
        if (now - lastFetched >= intervalMs) {
          await fetchFeed(feed.id);
        }
      }
    } catch (err) {
      console.error("RSS scheduler error:", err);
    }
  });
  cron.schedule("0 3 * * *", () => {
    pruneOldItems().catch(console.error);
  });
  console.log("RSS scheduler started");
}
let schedulersStarted = false;
if (!schedulersStarted) {
  schedulersStarted = true;
  try {
    startRssScheduler();
    startBookmarkChecker();
    startIcsScheduler();
  } catch (err) {
    console.error("Failed to start schedulers:", err);
  }
}
const handle = async ({ event, resolve }) => {
  return resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-7RABUQDG.js.map
