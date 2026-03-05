import { j as json } from './index-wpIsICWW.js';
import { d as db, t as tasks } from './index2-CQQ6lQvR.js';
import { desc } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const GET = async () => {
  const rows = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  return json(rows);
};
const POST = async ({ request }) => {
  const body = await request.json();
  const { title, goalId, dueDate, priority = "medium" } = body;
  if (!title?.trim()) return json({ error: "Title required" }, { status: 400 });
  const id = crypto.randomUUID();
  const ts = now();
  const [row] = await db.insert(tasks).values({ id, title: title.trim(), goalId, dueDate, priority, isCompleted: false, createdAt: ts, updatedAt: ts }).returning();
  return json(row, { status: 201 });
};

export { GET, POST };
//# sourceMappingURL=_server.ts-DYnthOV6.js.map
