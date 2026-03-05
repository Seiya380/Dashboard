import { j as json } from './index-wpIsICWW.js';
import { d as db, b as bookmarks } from './index2-CQQ6lQvR.js';
import { desc } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const GET = async () => {
  const rows = await db.select().from(bookmarks).orderBy(desc(bookmarks.createdAt));
  return json(rows);
};
const POST = async ({ request }) => {
  const body = await request.json();
  const { url, title, description, tags } = body;
  if (!url?.trim() || !title?.trim()) return json({ error: "URL and title required" }, { status: 400 });
  const id = crypto.randomUUID();
  const ts = now();
  const [row] = await db.insert(bookmarks).values({
    id,
    url: url.trim(),
    title: title.trim(),
    description,
    tags: tags ? JSON.stringify(tags) : null,
    createdAt: ts,
    updatedAt: ts
  }).returning();
  return json(row, { status: 201 });
};

export { GET, POST };
//# sourceMappingURL=_server.ts-Cq8HJJLX.js.map
