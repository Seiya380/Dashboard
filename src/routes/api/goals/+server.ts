import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { goals } from '$lib/server/db/schema.js';
import { now } from '$lib/utils/dates.js';
import { desc } from 'drizzle-orm';

export const GET = async () => {
	const rows = await db.select().from(goals).orderBy(desc(goals.createdAt));
	return json(rows);
};

export const POST = async ({ request }) => {
	const body = await request.json();
	const { title, description, color = '#cba6f7' } = body;
	if (!title?.trim()) return json({ error: 'Title required' }, { status: 400 });

	const id = crypto.randomUUID();
	const ts = now();
	const [row] = await db
		.insert(goals)
		.values({ id, title: title.trim(), description, color, isCompleted: false, createdAt: ts, updatedAt: ts })
		.returning();
	return json(row, { status: 201 });
};
