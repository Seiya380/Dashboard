import { redirect, error } from '@sveltejs/kit';
import { createOAuth2Client, saveTokens } from '$lib/server/google/auth.js';
import { syncCalendarEvents } from '$lib/server/google/calendar.js';

export const GET = async ({ url }) => {
	const code = url.searchParams.get('code');
	if (!code) throw error(400, 'No code provided');

	const client = createOAuth2Client();
	try {
		const { tokens } = await client.getToken(code);
		saveTokens(tokens);

		// Sync events in background
		syncCalendarEvents().catch(console.error);

		throw redirect(302, '/');
	} catch (err) {
		if ((err as { status?: number }).status === 302) throw err;
		throw error(500, 'Failed to exchange code');
	}
};
