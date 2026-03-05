import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { tasks } from '$lib/server/db/schema.js';
import { desc } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';

export const GET = async () => {
	const rows = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
	return json(rows);
};

export const POST = async ({ request }) => {
	const body = await request.json();
	const { title, goalId, dueDate, priority = 'medium' } = body;
	if (!title?.trim()) return json({ error: 'Title required' }, { status: 400 });

	const id = crypto.randomUUID();
	const ts = now();
	const [row] = await db
		.insert(tasks)
		.values({ id, title: title.trim(), goalId, dueDate, priority, isCompleted: false, createdAt: ts, updatedAt: ts })
		.returning();
	return json(row, { status: 201 });
};
