import { redirect } from '@sveltejs/kit';
import { saveTokens, CLIENT_ID, CLIENT_SECRET } from '$lib/server/spotify/auth';

export async function GET({ url }) {
	const code  = url.searchParams.get('code');
	const error = url.searchParams.get('error');

	if (error || !code) throw redirect(302, '/?spotify=error');

	const redirectUri = `${url.origin}/api/spotify/callback`;

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: redirectUri,
		}),
	});

	if (!res.ok) throw redirect(302, '/?spotify=error');

	const data = await res.json();
	saveTokens(data.access_token, data.refresh_token, data.expires_in);

	throw redirect(302, '/');
}
