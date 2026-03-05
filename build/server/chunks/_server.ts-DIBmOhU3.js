import { e as error, j as json } from './index-wpIsICWW.js';
import { d as db, i as icsSubscriptions } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { b as syncIcsSubscription } from './ics-sync-D7cRs-DF.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import './dates-CjMa0hVO.js';
import 'node-cron';

const DELETE = async ({ params }) => {
  const deleted = await db.delete(icsSubscriptions).where(eq(icsSubscriptions.id, params.id)).returning();
  if (!deleted.length) throw error(404, "Not found");
  return new Response(null, { status: 204 });
};
const POST = async ({ params }) => {
  const count = await syncIcsSubscription(params.id);
  return json({ synced: count });
};

export { DELETE, POST };
//# sourceMappingURL=_server.ts-DIBmOhU3.js.map
