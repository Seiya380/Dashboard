import { j as json } from './index-wpIsICWW.js';
import { d as db, g as goals } from './index2-CQQ6lQvR.js';
import { n as now } from './dates-CjMa0hVO.js';
import { desc } from 'drizzle-orm';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const GET = async () => {
  const rows = await db.select().from(goals).orderBy(desc(goals.createdAt));
  return json(rows);
};
const POST = async ({ request }) => {
  const body = await request.json();
  const { title, description, color = "#cba6f7" } = body;
  if (!title?.trim()) return json({ error: "Title required" }, { status: 400 });
  const id = crypto.randomUUID();
  const ts = now();
  const [row] = await db.insert(goals).values({ id, title: title.trim(), description, color, isCompleted: false, createdAt: ts, updatedAt: ts }).returning();
  return json(row, { status: 201 });
};

export { GET, POST };
//# sourceMappingURL=_server.ts-DeqxnwKT.js.map
