import { e as error, j as json } from './index-wpIsICWW.js';
import { c as checkBookmarkById } from './checker-CqUvwaAs.js';
import './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'drizzle-orm';
import './dates-CjMa0hVO.js';
import 'node-cron';

const POST = async ({ params }) => {
  const updated = await checkBookmarkById(params.id);
  if (!updated) throw error(404, "Not found");
  return json(updated);
};

export { POST };
//# sourceMappingURL=_server.ts-CWm3s12p.js.map
