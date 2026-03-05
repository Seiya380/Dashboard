import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { settings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

interface Link { id: string; name: string; url: string; }

function now() { return new Date().toISOString(); }

function getLinks(): Link[] {
	const row = db.select().from(settings).where(eq(settings.key, 'quick_links')).get();
	if (!row) return [];
	try { return JSON.parse(row.value); } catch { return []; }
}

function saveLinks(links: Link[]) {
	db.insert(settings)
		.values({ key: 'quick_links', value: JSON.stringify(links), updatedAt: now() })
		.onConflictDoUpdate({ target: settings.key, set: { value: JSON.stringify(links), updatedAt: now() } })
		.run();
}

export function GET() {
	return json(getLinks());
}

export async function POST({ request }) {
	const { name, url } = await request.json();
	if (!name?.trim() || !url?.trim()) return json({ error: 'Name and URL required' }, { status: 400 });

	const links = getLinks();
	const link: Link = { id: crypto.randomUUID(), name: name.trim(), url: url.trim() };
	links.push(link);
	saveLinks(links);
	return json(link);
}

export async function DELETE({ request }) {
	const { id } = await request.json();
	saveLinks(getLinks().filter(l => l.id !== id));
	return json({ ok: true });
}
