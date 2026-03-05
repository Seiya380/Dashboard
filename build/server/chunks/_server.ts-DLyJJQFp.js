import { j as json } from './index-wpIsICWW.js';
import { d as db, s as settings } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const EMBED_KEY = "embed_url";
const GET = async () => {
  const [row] = await db.select().from(settings).where(eq(settings.key, EMBED_KEY));
  return json({ url: row?.value ?? null });
};
const PUT = async ({ request }) => {
  const { url } = await request.json();
  const ts = now();
  if (!url) {
    await db.delete(settings).where(eq(settings.key, EMBED_KEY));
    return json({ url: null });
  }
  await db.insert(settings).values({ key: EMBED_KEY, value: url, updatedAt: ts }).onConflictDoUpdate({ target: settings.key, set: { value: url, updatedAt: ts } });
  return json({ url });
};
const POST = async ({ request }) => {
  const { url } = await request.json();
  if (!url) return json({ canEmbed: false, reason: "No URL provided" }, { status: 400 });
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(8e3),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DashboardBot/1.0)" }
    });
    const xfo = res.headers.get("x-frame-options") ?? "";
    const csp = res.headers.get("content-security-policy") ?? "";
    const blockedByXFO = /deny|sameorigin/i.test(xfo);
    const blockedByCSP = /frame-ancestors\s+('none'|'self')/i.test(csp) && !csp.includes("*");
    if (blockedByXFO || blockedByCSP) {
      const header = blockedByXFO ? `X-Frame-Options: ${xfo}` : "CSP frame-ancestors";
      return json({ canEmbed: false, reason: `Site blocks embedding (${header})` });
    }
    return json({ canEmbed: true });
  } catch (err) {
    return json({ canEmbed: true, warning: "Could not verify headers — site may block embedding" });
  }
};

export { GET, POST, PUT };
//# sourceMappingURL=_server.ts-DLyJJQFp.js.map
