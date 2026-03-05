import { db } from '$lib/server/db';
import { settings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export const CLIENT_ID     = SPOTIFY_CLIENT_ID;
export const CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;

function now() { return new Date().toISOString(); }

function getSetting(key: string): string | null {
	return db.select().from(settings).where(eq(settings.key, key)).get()?.value ?? null;
}

function setSetting(key: string, value: string) {
	db.insert(settings)
		.values({ key, value, updatedAt: now() })
		.onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: now() } })
		.run();
}

export function isConnected(): boolean {
	return !!getSetting('spotify_refresh_token');
}

export async function getAccessToken(): Promise<string | null> {
	const refreshToken = getSetting('spotify_refresh_token');
	if (!refreshToken) return null;

	const expiresAt  = getSetting('spotify_expires_at');
	const accessToken = getSetting('spotify_access_token');

	if (accessToken && expiresAt && Date.now() < parseInt(expiresAt) - 60_000) {
		return accessToken;
	}

	return refreshAccessToken(refreshToken);
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
		},
		body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
	});

	if (!res.ok) return null;

	const data = await res.json();
	setSetting('spotify_access_token', data.access_token);
	setSetting('spotify_expires_at', String(Date.now() + data.expires_in * 1000));
	if (data.refresh_token) setSetting('spotify_refresh_token', data.refresh_token);

	return data.access_token;
}

export function saveTokens(accessToken: string, refreshToken: string, expiresIn: number) {
	setSetting('spotify_access_token', accessToken);
	setSetting('spotify_refresh_token', refreshToken);
	setSetting('spotify_expires_at', String(Date.now() + expiresIn * 1000));
}

export function disconnect() {
	for (const key of ['spotify_access_token', 'spotify_refresh_token', 'spotify_expires_at']) {
		db.delete(settings).where(eq(settings.key, key)).run();
	}
}
