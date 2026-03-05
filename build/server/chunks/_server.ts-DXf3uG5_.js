import { j as json } from './index-wpIsICWW.js';
import { d as db, i as icsSubscriptions } from './index2-CQQ6lQvR.js';
import { a as addIcsSubscription } from './ics-sync-D7cRs-DF.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'drizzle-orm';
import './dates-CjMa0hVO.js';
import 'node-cron';

const GET = async () => {
  const subs = await db.select().from(icsSubscriptions);
  return json(subs);
};
const POST = async ({ request }) => {
  const body = await request.json();
  const { url, name, color } = body;
  if (!url?.trim()) return json({ error: "URL required" }, { status: 400 });
  const calName = name?.trim() || new URL(url).hostname;
  try {
    const sub = await addIcsSubscription(url.trim(), calName, color);
    return json(sub, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to add calendar";
    return json({ error: msg }, { status: 500 });
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-DXf3uG5_.js.map
