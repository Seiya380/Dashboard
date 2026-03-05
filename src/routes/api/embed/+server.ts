import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { settings } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { now } from '$lib/utils/dates.js';

const EMBED_KEY = 'embed_url';

export const GET = async () => {
	const [row] = await db.select().from(settings).where(eq(settings.key, EMBED_KEY));
	return json({ url: row?.value ?? null });
};

export const PUT = async ({ request }) => {
	const { url } = await request.json();
	const ts = now();

	if (!url) {
		await db.delete(settings).where(eq(settings.key, EMBED_KEY));
		return json({ url: null });
	}

	await db
		.insert(settings)
		.values({ key: EMBED_KEY, value: url, updatedAt: ts })
		.onConflictDoUpdate({ target: settings.key, set: { value: url, updatedAt: ts } });

	return json({ url });
};

/** HEAD-check whether a URL allows iframe embedding */
export const POST = async ({ request }) => {
	const { url } = await request.json();
	if (!url) return json({ canEmbed: false, reason: 'No URL provided' }, { status: 400 });

	try {
		const res = await fetch(url, {
			method: 'HEAD',
			signal: AbortSignal.timeout(8000),
			headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DashboardBot/1.0)' }
		});

		const xfo = res.headers.get('x-frame-options') ?? '';
		const csp = res.headers.get('content-security-policy') ?? '';

		const blockedByXFO = /deny|sameorigin/i.test(xfo);
		const blockedByCSP = /frame-ancestors\s+('none'|'self')/i.test(csp) && !csp.includes('*');

		if (blockedByXFO || blockedByCSP) {
			const header = blockedByXFO ? `X-Frame-Options: ${xfo}` : 'CSP frame-ancestors';
			return json({ canEmbed: false, reason: `Site blocks embedding (${header})` });
		}

		return json({ canEmbed: true });
	} catch (err) {
		// Network error or timeout — try to embed anyway, browser will show blank
		return json({ canEmbed: true, warning: 'Could not verify headers — site may block embedding' });
	}
};
