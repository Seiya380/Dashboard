import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { icsSubscriptions } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { syncIcsSubscription } from '$lib/server/google/ics-sync.js';

export const DELETE = async ({ params }) => {
	const deleted = await db
		.delete(icsSubscriptions)
		.where(eq(icsSubscriptions.id, params.id))
		.returning();
	if (!deleted.length) throw error(404, 'Not found');
	return new Response(null, { status: 204 });
};

export const POST = async ({ params }) => {
	// Force re-sync
	const count = await syncIcsSubscription(params.id);
	return json({ synced: count });
};
