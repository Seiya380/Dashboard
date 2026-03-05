import { json } from '@sveltejs/kit';
import { getAccessToken, isConnected } from '$lib/server/spotify/auth';

export async function GET() {
	if (!isConnected()) return json([]);

	const token = await getAccessToken();
	if (!token) return json([]);

	const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=4', {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!res.ok) return json([]);

	const data = await res.json();
	return json(
		data.items.map((item: {
			track: {
				name: string;
				artists: { name: string }[];
				album: { images: { url: string }[] };
				external_urls: { spotify: string };
			};
		}) => ({
			name:     item.track.name,
			artist:   item.track.artists.map((a) => a.name).join(', '),
			albumArt: item.track.album.images[2]?.url ?? item.track.album.images[0]?.url ?? null,
			url:      item.track.external_urls.spotify,
		}))
	);
}
