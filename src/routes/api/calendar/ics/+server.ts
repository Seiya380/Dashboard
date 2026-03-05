import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { calendarEvents } from '$lib/server/db/schema.js';
import { now } from '$lib/utils/dates.js';

export const POST = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File | null;
	if (!file) throw error(400, 'No file provided');

	const text = await file.text();

	try {
		// Basic ICS parsing without ical.js dependency issues
		const events = parseIcs(text);
		const syncedAt = now();

		for (const event of events) {
			await db
				.insert(calendarEvents)
				.values({ ...event, source: 'ics', syncedAt })
				.onConflictDoUpdate({
					target: calendarEvents.id,
					set: { title: event.title, startAt: event.startAt, endAt: event.endAt, syncedAt }
				});
		}

		return json({ imported: events.length });
	} catch (err) {
		throw error(500, 'Failed to parse ICS file');
	}
};

function parseIcs(text: string) {
	const events: { id: string; title: string; startAt: string; endAt: string; isAllDay: boolean; description?: string; location?: string }[] = [];
	const blocks = text.split('BEGIN:VEVENT');

	for (let i = 1; i < blocks.length; i++) {
		const block = blocks[i];
		const get = (key: string) => {
			const match = block.match(new RegExp(`^${key}[^:]*:(.*)$`, 'm'));
			return match?.[1]?.trim();
		};

		const uid = get('UID');
		const summary = get('SUMMARY');
		const dtstart = get('DTSTART');
		const dtend = get('DTEND');
		if (!uid || !summary || !dtstart) continue;

		const isAllDay = !dtstart.includes('T');
		const toISO = (v: string) => {
			if (v.includes('T')) {
				// Handle YYYYMMDDTHHMMSSZ
				const y = v.slice(0, 4), mo = v.slice(4, 6), d = v.slice(6, 8);
				const h = v.slice(9, 11), mi = v.slice(11, 13), s = v.slice(13, 15);
				return `${y}-${mo}-${d}T${h}:${mi}:${s}.000Z`;
			} else {
				const y = v.slice(0, 4), mo = v.slice(4, 6), d = v.slice(6, 8);
				return `${y}-${mo}-${d}T00:00:00.000Z`;
			}
		};

		events.push({
			id: uid,
			title: summary,
			startAt: toISO(dtstart),
			endAt: dtend ? toISO(dtend) : toISO(dtstart),
			isAllDay,
			description: get('DESCRIPTION'),
			location: get('LOCATION')
		});
	}

	return events;
};
