import { google } from 'googleapis';
import { getAuthenticatedClient } from './auth.js';
import { db } from '$lib/server/db/index.js';
import { calendarEvents } from '$lib/server/db/schema.js';
import { now } from '$lib/utils/dates.js';

export async function syncCalendarEvents() {
	const auth = await getAuthenticatedClient();
	if (!auth) return [];

	const calendar = google.calendar({ version: 'v3', auth });

	const timeMin = new Date().toISOString();
	const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days ahead

	try {
		const res = await calendar.events.list({
			calendarId: 'primary',
			timeMin,
			timeMax,
			singleEvents: true,
			orderBy: 'startTime',
			maxResults: 50
		});

		const items = res.data.items ?? [];
		const syncedAt = now();

		for (const item of items) {
			if (!item.id || !item.summary) continue;
			const isAllDay = !!item.start?.date;
			const startAt = item.start?.dateTime ?? `${item.start?.date}T00:00:00.000Z`;
			const endAt = item.end?.dateTime ?? `${item.end?.date}T00:00:00.000Z`;

			await db
				.insert(calendarEvents)
				.values({
					id: item.id,
					source: 'google',
					title: item.summary,
					description: item.description,
					location: item.location,
					startAt,
					endAt,
					isAllDay,
					calendarId: 'primary',
					syncedAt
				})
				.onConflictDoUpdate({
					target: calendarEvents.id,
					set: { title: item.summary, startAt, endAt, description: item.description, syncedAt }
				});
		}

		return items;
	} catch (err) {
		console.error('Calendar sync error:', err);
		return [];
	}
}
