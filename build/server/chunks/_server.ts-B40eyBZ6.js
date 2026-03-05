import { j as json } from './index-wpIsICWW.js';
import { d as db, r as rssFeeds } from './index2-CQQ6lQvR.js';
import { a as addFeed } from './fetcher-C-M3E2v1.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'rss-parser';
import 'drizzle-orm';
import './dates-CjMa0hVO.js';

const GET = async () => {
  const rows = await db.select().from(rssFeeds);
  return json(rows);
};
const POST = async ({ request }) => {
  const body = await request.json();
  const { url } = body;
  if (!url?.trim()) return json({ error: "URL required" }, { status: 400 });
  try {
    const feed = await addFeed(url.trim());
    return json(feed, { status: 201 });
  } catch (err) {
    return json({ error: "Failed to add feed" }, { status: 500 });
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-B40eyBZ6.js.map
