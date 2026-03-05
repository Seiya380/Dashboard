import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { calendarEvents } from '$lib/server/db/schema.js';
import { gte } from 'drizzle-orm';
import { syncCalendarEvents } from '$lib/server/google/calendar.js';

export const GET = async ({ url }) => {
	const sync = url.searchParams.get('sync') === 'true';
	if (sync) {
		await syncCalendarEvents();
	}

	const events = await db
		.select()
		.from(calendarEvents)
		.where(gte(calendarEvents.startAt, new Date().toISOString()))
		.orderBy(calendarEvents.startAt)
		.limit(20);

	return json(events);
};
