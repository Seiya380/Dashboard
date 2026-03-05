import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { widgetLayouts } from '$lib/server/db/schema.js';
import type { WidgetLayout } from '$lib/types/widget.js';

export const GET = async () => {
	const layouts = await db.select().from(widgetLayouts);
	return json(layouts);
};

export const PUT = async ({ request }) => {
	const body: WidgetLayout[] = await request.json();

	for (const layout of body) {
		await db
			.insert(widgetLayouts)
			.values(layout)
			.onConflictDoUpdate({
				target: widgetLayouts.widgetType,
				set: {
					colStart: layout.colStart,
					colEnd: layout.colEnd,
					rowStart: layout.rowStart,
					rowEnd: layout.rowEnd,
					visible: layout.visible
				}
			});
	}

	return json({ ok: true });
};
