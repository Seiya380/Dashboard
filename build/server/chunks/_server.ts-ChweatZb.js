import { j as json } from './index-wpIsICWW.js';
import { d as db, s as settings } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function getLinks() {
  const row = db.select().from(settings).where(eq(settings.key, "quick_links")).get();
  if (!row) return [];
  try {
    return JSON.parse(row.value);
  } catch {
    return [];
  }
}
function saveLinks(links) {
  db.insert(settings).values({ key: "quick_links", value: JSON.stringify(links), updatedAt: now() }).onConflictDoUpdate({ target: settings.key, set: { value: JSON.stringify(links), updatedAt: now() } }).run();
}
function GET() {
  return json(getLinks());
}
async function POST({ request }) {
  const { name, url } = await request.json();
  if (!name?.trim() || !url?.trim()) return json({ error: "Name and URL required" }, { status: 400 });
  const links = getLinks();
  const link = { id: crypto.randomUUID(), name: name.trim(), url: url.trim() };
  links.push(link);
  saveLinks(links);
  return json(link);
}
async function DELETE({ request }) {
  const { id } = await request.json();
  saveLinks(getLinks().filter((l) => l.id !== id));
  return json({ ok: true });
}

export { DELETE, GET, POST };
//# sourceMappingURL=_server.ts-ChweatZb.js.map
