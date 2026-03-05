import { google } from 'googleapis';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const GOOGLE_CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     ?? '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? '';

const TOKEN_PATH = './data/google-tokens.json';
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

export function createOAuth2Client() {
	return new google.auth.OAuth2(
		GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET,
		'http://localhost:5173/api/calendar/oauth/callback'
	);
}

export function getAuthUrl(): string {
	const client = createOAuth2Client();
	return client.generateAuthUrl({
		access_type: 'offline',
		prompt: 'consent',
		scope: SCOPES
	});
}

export function saveTokens(tokens: object) {
	writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
}

export function loadTokens(): object | null {
	if (!existsSync(TOKEN_PATH)) return null;
	try {
		return JSON.parse(readFileSync(TOKEN_PATH, 'utf-8'));
	} catch {
		return null;
	}
}

export async function getAuthenticatedClient() {
	const tokens = loadTokens();
	if (!tokens) return null;

	const client = createOAuth2Client();
	client.setCredentials(tokens);

	// Auto-refresh: save new tokens when refreshed
	client.on('tokens', (newTokens) => {
		const existing = loadTokens() as Record<string, unknown> | null ?? {};
		saveTokens({ ...existing, ...newTokens });
	});

	return client;
}
