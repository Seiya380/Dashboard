import { j as json } from './index-wpIsICWW.js';
import { d as db, c as calendarEvents } from './index2-CQQ6lQvR.js';
import { gte } from 'drizzle-orm';
import { s as syncCalendarEvents } from './calendar-BuUVkIoO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'googleapis';
import './auth-euE3C2Gy.js';
import './dates-CjMa0hVO.js';

const GET = async ({ url }) => {
  const sync = url.searchParams.get("sync") === "true";
  if (sync) {
    await syncCalendarEvents();
  }
  const events = await db.select().from(calendarEvents).where(gte(calendarEvents.startAt, (/* @__PURE__ */ new Date()).toISOString())).orderBy(calendarEvents.startAt).limit(20);
  return json(events);
};

export { GET };
//# sourceMappingURL=_server.ts-Bj0q4ty7.js.map
