import { j as json } from './index-wpIsICWW.js';
import { d as db, a as rssItems } from './index2-CQQ6lQvR.js';
import { desc } from 'drizzle-orm';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const GET = async ({ url }) => {
  const limit = Number(url.searchParams.get("limit") ?? 50);
  const rows = await db.select().from(rssItems).orderBy(desc(rssItems.publishedAt)).limit(limit);
  return json(rows);
};

export { GET };
//# sourceMappingURL=_server.ts-5AdJHTfr.js.map
