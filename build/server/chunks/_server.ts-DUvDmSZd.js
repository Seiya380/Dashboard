import { e as error, j as json } from './index-wpIsICWW.js';
import { d as db, t as tasks } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const PATCH = async ({ params, request }) => {
  const body = await request.json();
  const { isCompleted, title, dueDate, priority } = body;
  const updates = { updatedAt: now() };
  if (typeof isCompleted === "boolean") {
    updates.isCompleted = isCompleted;
    updates.completedAt = isCompleted ? now() : null;
  }
  if (title !== void 0) updates.title = title;
  if (dueDate !== void 0) updates.dueDate = dueDate;
  if (priority !== void 0) updates.priority = priority;
  const [row] = await db.update(tasks).set(updates).where(eq(tasks.id, params.id)).returning();
  if (!row) throw error(404, "Not found");
  return json(row);
};
const DELETE = async ({ params }) => {
  await db.delete(tasks).where(eq(tasks.id, params.id));
  return new Response(null, { status: 204 });
};

export { DELETE, PATCH };
//# sourceMappingURL=_server.ts-DUvDmSZd.js.map
