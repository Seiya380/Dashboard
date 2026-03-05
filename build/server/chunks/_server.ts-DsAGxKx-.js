import { e as error, j as json } from './index-wpIsICWW.js';
import { d as db, c as calendarEvents } from './index2-CQQ6lQvR.js';
import { n as now } from './dates-CjMa0hVO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const POST = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) throw error(400, "No file provided");
  const text = await file.text();
  try {
    const events = parseIcs(text);
    const syncedAt = now();
    for (const event of events) {
      await db.insert(calendarEvents).values({ ...event, source: "ics", syncedAt }).onConflictDoUpdate({
        target: calendarEvents.id,
        set: { title: event.title, startAt: event.startAt, endAt: event.endAt, syncedAt }
      });
    }
    return json({ imported: events.length });
  } catch (err) {
    throw error(500, "Failed to parse ICS file");
  }
};
function parseIcs(text) {
  const events = [];
  const blocks = text.split("BEGIN:VEVENT");
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const get = (key) => {
      const match = block.match(new RegExp(`^${key}[^:]*:(.*)$`, "m"));
      return match?.[1]?.trim();
    };
    const uid = get("UID");
    const summary = get("SUMMARY");
    const dtstart = get("DTSTART");
    const dtend = get("DTEND");
    if (!uid || !summary || !dtstart) continue;
    const isAllDay = !dtstart.includes("T");
    const toISO = (v) => {
      if (v.includes("T")) {
        const y = v.slice(0, 4), mo = v.slice(4, 6), d = v.slice(6, 8);
        const h = v.slice(9, 11), mi = v.slice(11, 13), s = v.slice(13, 15);
        return `${y}-${mo}-${d}T${h}:${mi}:${s}.000Z`;
      } else {
        const y = v.slice(0, 4), mo = v.slice(4, 6), d = v.slice(6, 8);
        return `${y}-${mo}-${d}T00:00:00.000Z`;
      }
    };
    events.push({
      id: uid,
      title: summary,
      startAt: toISO(dtstart),
      endAt: dtend ? toISO(dtend) : toISO(dtstart),
      isAllDay,
      description: get("DESCRIPTION"),
      location: get("LOCATION")
    });
  }
  return events;
}

export { POST };
//# sourceMappingURL=_server.ts-DsAGxKx-.js.map
