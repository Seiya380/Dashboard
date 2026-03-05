import { json } from '@sveltejs/kit';
import { disconnect } from '$lib/server/spotify/auth';

export function DELETE() {
	disconnect();
	return json({ ok: true });
}
