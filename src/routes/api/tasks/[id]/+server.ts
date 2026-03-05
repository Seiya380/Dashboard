import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { tasks } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';

export const PATCH = async ({ params, request }) => {
	const body = await request.json();
	const { isCompleted, title, dueDate, priority } = body;

	const updates: Record<string, unknown> = { updatedAt: now() };
	if (typeof isCompleted === 'boolean') {
		updates.isCompleted = isCompleted;
		updates.completedAt = isCompleted ? now() : null;
	}
	if (title !== undefined) updates.title = title;
	if (dueDate !== undefined) updates.dueDate = dueDate;
	if (priority !== undefined) updates.priority = priority;

	const [row] = await db.update(tasks).set(updates).where(eq(tasks.id, params.id)).returning();
	if (!row) throw error(404, 'Not found');
	return json(row);
};

export const DELETE = async ({ params }) => {
	await db.delete(tasks).where(eq(tasks.id, params.id));
	return new Response(null, { status: 204 });
};
