import { d as db, i as icsSubscriptions, c as calendarEvents } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import cron from 'node-cron';

function parseIcsText(text, source) {
  const events = [];
  const blocks = text.split("BEGIN:VEVENT");
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const unfolded = block.replace(/\r?\n[ \t]/g, "");
    const get = (key) => {
      const match = unfolded.match(new RegExp(`^${key}(?:;[^:]*)?:(.*)$`, "m"));
      return match?.[1]?.trim();
    };
    const uid = get("UID");
    const summary = get("SUMMARY");
    const dtstart = get("DTSTART");
    const dtend = get("DTEND") ?? get("DURATION");
    if (!uid || !summary || !dtstart) continue;
    const isAllDay = !dtstart.includes("T");
    const toISO = (v) => {
      const clean = v.includes(":") ? v.split(":").pop() : v;
      if (clean.includes("T")) {
        const y = clean.slice(0, 4);
        const mo = clean.slice(4, 6);
        const d = clean.slice(6, 8);
        const h = clean.slice(9, 11);
        const mi = clean.slice(11, 13);
        const s = clean.slice(13, 15) || "00";
        const utc = clean.endsWith("Z") ? "Z" : "";
        return `${y}-${mo}-${d}T${h}:${mi}:${s}.000${utc || "Z"}`;
      } else {
        const y = clean.slice(0, 4);
        const mo = clean.slice(4, 6);
        const d = clean.slice(6, 8);
        return `${y}-${mo}-${d}T00:00:00.000Z`;
      }
    };
    const description = get("DESCRIPTION")?.replace(/\\n/g, "\n")?.replace(/\\,/g, ",")?.replace(/\\\\/g, "\\");
    const location = get("LOCATION")?.replace(/\\,/g, ",");
    events.push({
      id: uid,
      title: summary.replace(/\\,/g, ",").replace(/\\n/g, " "),
      startAt: toISO(dtstart),
      endAt: dtend ? toISO(dtend) : toISO(dtstart),
      isAllDay,
      description,
      location,
      source
    });
  }
  return events;
}
async function syncIcsSubscription(subId) {
  const [sub] = await db.select().from(icsSubscriptions).where(eq(icsSubscriptions.id, subId));
  if (!sub) return 0;
  try {
    const res = await fetch(sub.url, {
      headers: { "User-Agent": "Dashboard-Cal/1.0" },
      signal: AbortSignal.timeout(15e3)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const events = parseIcsText(text, `ics:${subId}`);
    const syncedAt = now();
    for (const event of events) {
      await db.insert(calendarEvents).values({ ...event, syncedAt }).onConflictDoUpdate({
        target: calendarEvents.id,
        set: {
          title: event.title,
          startAt: event.startAt,
          endAt: event.endAt,
          description: event.description,
          location: event.location,
          syncedAt
        }
      });
    }
    await db.update(icsSubscriptions).set({ lastSyncedAt: syncedAt }).where(eq(icsSubscriptions.id, subId));
    return events.length;
  } catch (err) {
    console.error(`ICS sync error for ${sub.url}:`, err);
    return 0;
  }
}
async function syncAllIcsSubscriptions() {
  const subs = await db.select().from(icsSubscriptions);
  for (const sub of subs) {
    await syncIcsSubscription(sub.id);
  }
}
let icsSchedulerStarted = false;
function startIcsScheduler() {
  if (icsSchedulerStarted) return;
  icsSchedulerStarted = true;
  cron.schedule("*/30 * * * *", () => {
    syncAllIcsSubscriptions().catch(console.error);
  });
  console.log("ICS scheduler started");
}
async function addIcsSubscription(url, name, color = "#89b4fa") {
  const id = crypto.randomUUID();
  const ts = now();
  const [row] = await db.insert(icsSubscriptions).values({ id, url, name, color, createdAt: ts }).returning();
  syncIcsSubscription(id).catch(console.error);
  return row;
}

export { addIcsSubscription as a, syncIcsSubscription as b, startIcsScheduler as s };
//# sourceMappingURL=ics-sync-D7cRs-DF.js.map
