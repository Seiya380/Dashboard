import { redirect } from '@sveltejs/kit';
import { CLIENT_ID } from '$lib/server/spotify/auth';

const SCOPES = [
	'user-read-currently-playing',
	'user-read-playback-state',
	'user-read-recently-played',
	'user-top-read',
].join(' ');

export function GET({ url }) {
	const redirectUri = `${url.origin}/api/spotify/callback`;

	const params = new URLSearchParams({
		response_type: 'code',
		client_id: CLIENT_ID,
		scope: SCOPES,
		redirect_uri: redirectUri,
	});

	throw redirect(302, `https://accounts.spotify.com/authorize?${params}`);
}
