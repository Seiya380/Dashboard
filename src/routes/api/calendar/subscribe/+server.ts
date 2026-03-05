import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { icsSubscriptions } from '$lib/server/db/schema.js';
import { addIcsSubscription } from '$lib/server/google/ics-sync.js';

export const GET = async () => {
	const subs = await db.select().from(icsSubscriptions);
	return json(subs);
};

export const POST = async ({ request }) => {
	const body = await request.json();
	const { url, name, color } = body;

	if (!url?.trim()) return json({ error: 'URL required' }, { status: 400 });

	// Use URL hostname as name fallback
	const calName = name?.trim() || new URL(url).hostname;

	try {
		const sub = await addIcsSubscription(url.trim(), calName, color);
		return json(sub, { status: 201 });
	} catch (err) {
		const msg = err instanceof Error ? err.message : 'Failed to add calendar';
		return json({ error: msg }, { status: 500 });
	}
};
