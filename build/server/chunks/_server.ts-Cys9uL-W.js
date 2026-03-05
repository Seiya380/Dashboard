import { e as error } from './index-wpIsICWW.js';
import { d as db, f as watchlistTickers } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const DELETE = async ({ params }) => {
  const sym = params.symbol.toUpperCase();
  const deleted = await db.delete(watchlistTickers).where(eq(watchlistTickers.symbol, sym)).returning();
  if (!deleted.length) throw error(404, "Not found");
  return new Response(null, { status: 204 });
};

export { DELETE };
//# sourceMappingURL=_server.ts-Cys9uL-W.js.map
