import { j as json } from './index-wpIsICWW.js';
import { d as db, w as widgetLayouts } from './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const GET = async () => {
  const layouts = await db.select().from(widgetLayouts);
  return json(layouts);
};
const PUT = async ({ request }) => {
  const body = await request.json();
  for (const layout of body) {
    await db.insert(widgetLayouts).values(layout).onConflictDoUpdate({
      target: widgetLayouts.widgetType,
      set: {
        colStart: layout.colStart,
        colEnd: layout.colEnd,
        rowStart: layout.rowStart,
        rowEnd: layout.rowEnd,
        visible: layout.visible
      }
    });
  }
  return json({ ok: true });
};

export { GET, PUT };
//# sourceMappingURL=_server.ts-BJeGueOM.js.map
