import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db/index.js';
import { widgetLayouts } from '$lib/server/db/schema.js';
import { DEFAULT_LAYOUTS } from '$lib/types/widget.js';
import type { WidgetLayout } from '$lib/types/widget.js';

export const load: LayoutServerLoad = async () => {
	const dbLayouts = await db.select().from(widgetLayouts);

	// Merge DB layouts with defaults
	const layoutMap = new Map<string, WidgetLayout>(
		DEFAULT_LAYOUTS.map((l) => [l.widgetType, l])
	);
	for (const row of dbLayouts) {
		layoutMap.set(row.widgetType, {
			widgetType: row.widgetType as WidgetLayout['widgetType'],
			colStart: row.colStart,
			colEnd: row.colEnd,
			rowStart: row.rowStart,
			rowEnd: row.rowEnd,
			visible: row.visible
		});
	}

	return { layouts: Array.from(layoutMap.values()) };
};
