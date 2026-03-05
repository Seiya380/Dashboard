import { json } from '@sveltejs/kit';
import { getAccessToken, isConnected } from '$lib/server/spotify/auth';

export async function GET() {
	if (!isConnected()) return json([]);

	const token = await getAccessToken();
	if (!token) return json([]);

	const res = await fetch('https://api.spotify.com/v1/me/playlists?limit=20', {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!res.ok) return json([]);

	const data = await res.json();
	return json(
		data.items.map((p: {
			id: string;
			name: string;
			images: { url: string }[];
			tracks: { total: number };
			external_urls: { spotify: string };
		}) => ({
			id:         p.id,
			name:       p.name,
			cover:      p.images[0]?.url ?? null,
			total:      p.tracks.total,
			url:        p.external_urls.spotify,
		}))
	);
}
