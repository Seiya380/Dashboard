import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { watchlistTickers } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const DELETE = async ({ params }) => {
	const sym = params.symbol.toUpperCase();
	const deleted = await db
		.delete(watchlistTickers)
		.where(eq(watchlistTickers.symbol, sym))
		.returning();
	if (!deleted.length) throw error(404, 'Not found');
	return new Response(null, { status: 204 });
};
