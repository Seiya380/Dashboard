import { e as error, j as json } from './index-wpIsICWW.js';
import { d as db, r as rssFeeds } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const DELETE = async ({ params }) => {
  const deleted = await db.delete(rssFeeds).where(eq(rssFeeds.id, params.id)).returning();
  if (!deleted.length) throw error(404, "Feed not found");
  return new Response(null, { status: 204 });
};
const PATCH = async ({ params, request }) => {
  const body = await request.json();
  const { isActive, fetchIntervalMinutes } = body;
  const updates = {};
  if (typeof isActive === "boolean") updates.isActive = isActive;
  if (fetchIntervalMinutes !== void 0) updates.fetchIntervalMinutes = fetchIntervalMinutes;
  const [row] = await db.update(rssFeeds).set(updates).where(eq(rssFeeds.id, params.id)).returning();
  if (!row) throw error(404, "Not found");
  return json(row);
};

export { DELETE, PATCH };
//# sourceMappingURL=_server.ts-DjX9S0Ya.js.map
