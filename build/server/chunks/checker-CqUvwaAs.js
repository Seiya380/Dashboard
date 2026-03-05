import { d as db, b as bookmarks } from './index2-CQQ6lQvR.js';
import { eq, or, isNull, lt } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import cron from 'node-cron';

async function checkBookmarkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5e3);
  try {
    const res = await fetch(url, { method: "HEAD", signal: controller.signal, redirect: "follow" });
    return { statusCode: res.status, isAlive: res.status >= 200 && res.status < 400 };
  } catch {
    return { statusCode: 0, isAlive: false };
  } finally {
    clearTimeout(timeout);
  }
}
async function checkBookmarkById(id) {
  const [bookmark] = await db.select().from(bookmarks).where(eq(bookmarks.id, id));
  if (!bookmark) return null;
  const result = await checkBookmarkUrl(bookmark.url);
  const ts = now();
  const [updated] = await db.update(bookmarks).set({ ...result, statusCheckedAt: ts, updatedAt: ts }).where(eq(bookmarks.id, id)).returning();
  return updated;
}
async function checkAllBookmarks() {
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1e3).toISOString();
  const rows = await db.select().from(bookmarks).where(or(isNull(bookmarks.statusCheckedAt), lt(bookmarks.statusCheckedAt, sixHoursAgo)));
  for (let i = 0; i < rows.length; i += 5) {
    const chunk = rows.slice(i, i + 5);
    await Promise.all(
      chunk.map(async (b) => {
        const result = await checkBookmarkUrl(b.url);
        const ts = now();
        await db.update(bookmarks).set({ ...result, statusCheckedAt: ts, updatedAt: ts }).where(eq(bookmarks.id, b.id));
      })
    );
  }
}
function startBookmarkChecker() {
  cron.schedule("0 */6 * * *", () => {
    checkAllBookmarks().catch(console.error);
  });
}

export { checkBookmarkById as c, startBookmarkChecker as s };
//# sourceMappingURL=checker-CqUvwaAs.js.map
