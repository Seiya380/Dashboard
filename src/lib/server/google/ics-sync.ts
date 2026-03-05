import { db } from '$lib/server/db/index.js';
import { icsSubscriptions, calendarEvents } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';
import cron from 'node-cron';

function parseIcsText(text: string, source: string) {
	const events: {
		id: string;
		title: string;
		startAt: string;
		endAt: string;
		isAllDay: boolean;
		description?: string;
		location?: string;
		source: string;
	}[] = [];

	const blocks = text.split('BEGIN:VEVENT');

	for (let i = 1; i < blocks.length; i++) {
		const block = blocks[i];

		// Handle folded lines (RFC 5545 line folding: CRLF followed by whitespace)
		const unfolded = block.replace(/\r?\n[ \t]/g, '');

		const get = (key: string): string | undefined => {
			const match = unfolded.match(new RegExp(`^${key}(?:;[^:]*)?:(.*)$`, 'm'));
			return match?.[1]?.trim();
		};

		const uid = get('UID');
		const summary = get('SUMMARY');
		const dtstart = get('DTSTART');
		const dtend = get('DTEND') ?? get('DURATION');
		if (!uid || !summary || !dtstart) continue;

		const isAllDay = !dtstart.includes('T');

		const toISO = (v: string): string => {
			// Remove timezone ID prefix (e.g. "TZID=America/New_York:")
			const clean = v.includes(':') ? v.split(':').pop()! : v;
			if (clean.includes('T')) {
				// YYYYMMDDTHHMMSS[Z]
				const y = clean.slice(0, 4);
				const mo = clean.slice(4, 6);
				const d = clean.slice(6, 8);
				const h = clean.slice(9, 11);
				const mi = clean.slice(11, 13);
				const s = clean.slice(13, 15) || '00';
				const utc = clean.endsWith('Z') ? 'Z' : '';
				return `${y}-${mo}-${d}T${h}:${mi}:${s}.000${utc || 'Z'}`;
			} else {
				const y = clean.slice(0, 4);
				const mo = clean.slice(4, 6);
				const d = clean.slice(6, 8);
				return `${y}-${mo}-${d}T00:00:00.000Z`;
			}
		};

		const description = get('DESCRIPTION')
			?.replace(/\\n/g, '\n')
			?.replace(/\\,/g, ',')
			?.replace(/\\\\/g, '\\');

		const location = get('LOCATION')?.replace(/\\,/g, ',');

		events.push({
			id: uid,
			title: summary.replace(/\\,/g, ',').replace(/\\n/g, ' '),
			startAt: toISO(dtstart),
			endAt: dtend ? toISO(dtend) : toISO(dtstart),
			isAllDay,
			description,
			location,
			source
		});
	}

	return events;
}

export async function syncIcsSubscription(subId: string): Promise<number> {
	const [sub] = await db
		.select()
		.from(icsSubscriptions)
		.where(eq(icsSubscriptions.id, subId));
	if (!sub) return 0;

	try {
		const res = await fetch(sub.url, {
			headers: { 'User-Agent': 'Dashboard-Cal/1.0' },
			signal: AbortSignal.timeout(15000)
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const text = await res.text();
		const events = parseIcsText(text, `ics:${subId}`);
		const syncedAt = now();

		for (const event of events) {
			await db
				.insert(calendarEvents)
				.values({ ...event, syncedAt })
				.onConflictDoUpdate({
					target: calendarEvents.id,
					set: {
						title: event.title,
						startAt: event.startAt,
						endAt: event.endAt,
						description: event.description,
						location: event.location,
						syncedAt
					}
				});
		}

		await db
			.update(icsSubscriptions)
			.set({ lastSyncedAt: syncedAt })
			.where(eq(icsSubscriptions.id, subId));

		return events.length;
	} catch (err) {
		console.error(`ICS sync error for ${sub.url}:`, err);
		return 0;
	}
}

export async function syncAllIcsSubscriptions() {
	const subs = await db.select().from(icsSubscriptions);
	for (const sub of subs) {
		await syncIcsSubscription(sub.id);
	}
}

let icsSchedulerStarted = false;

export function startIcsScheduler() {
	if (icsSchedulerStarted) return;
	icsSchedulerStarted = true;

	// Sync every 30 minutes
	cron.schedule('*/30 * * * *', () => {
		syncAllIcsSubscriptions().catch(console.error);
	});

	console.log('ICS scheduler started');
}

export async function addIcsSubscription(url: string, name: string, color = '#89b4fa') {
	const id = crypto.randomUUID();
	const ts = now();

	const [row] = await db
		.insert(icsSubscriptions)
		.values({ id, url, name, color, createdAt: ts })
		.returning();

	// Sync immediately in background
	syncIcsSubscription(id).catch(console.error);

	return row;
}
