import { e as error, j as json } from './index-wpIsICWW.js';
import { d as db, b as bookmarks } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const PATCH = async ({ params, request }) => {
  const body = await request.json();
  const { title, description, tags, url } = body;
  const updates = { updatedAt: now() };
  if (title !== void 0) updates.title = title;
  if (description !== void 0) updates.description = description;
  if (url !== void 0) updates.url = url;
  if (tags !== void 0) updates.tags = JSON.stringify(tags);
  const [row] = await db.update(bookmarks).set(updates).where(eq(bookmarks.id, params.id)).returning();
  if (!row) throw error(404, "Not found");
  return json(row);
};
const DELETE = async ({ params }) => {
  await db.delete(bookmarks).where(eq(bookmarks.id, params.id));
  return new Response(null, { status: 204 });
};

export { DELETE, PATCH };
//# sourceMappingURL=_server.ts-BB_rMmb4.js.map
