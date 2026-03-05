import { d as db, w as widgetLayouts } from './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const DEFAULT_LAYOUTS = [
  { widgetType: "quote", colStart: 1, colEnd: 13, rowStart: 1, rowEnd: 3, visible: false },
  // Embed: dominant left panel
  { widgetType: "embed", colStart: 1, colEnd: 8, rowStart: 1, rowEnd: 8, visible: true },
  // Calendar: right sidebar top
  { widgetType: "calendar", colStart: 8, colEnd: 13, rowStart: 1, rowEnd: 7, visible: true },
  // Spotify: right sidebar bottom
  { widgetType: "spotify", colStart: 8, colEnd: 13, rowStart: 7, rowEnd: 11, visible: true },
  // Bottom row: Pomodoro | Links | News
  { widgetType: "goals", colStart: 1, colEnd: 4, rowStart: 8, rowEnd: 11, visible: true },
  { widgetType: "links", colStart: 4, colEnd: 6, rowStart: 8, rowEnd: 11, visible: true },
  { widgetType: "news", colStart: 6, colEnd: 8, rowStart: 8, rowEnd: 11, visible: true },
  { widgetType: "watchlist", colStart: 8, colEnd: 13, rowStart: 7, rowEnd: 11, visible: false },
  { widgetType: "bookmarks", colStart: 1, colEnd: 7, rowStart: 8, rowEnd: 11, visible: false },
  { widgetType: "chat", colStart: 9, colEnd: 13, rowStart: 1, rowEnd: 8, visible: false }
];
const load = async () => {
  const dbLayouts = await db.select().from(widgetLayouts);
  const layoutMap = new Map(
    DEFAULT_LAYOUTS.map((l) => [l.widgetType, l])
  );
  for (const row of dbLayouts) {
    layoutMap.set(row.widgetType, {
      widgetType: row.widgetType,
      colStart: row.colStart,
      colEnd: row.colEnd,
      rowStart: row.rowStart,
      rowEnd: row.rowEnd,
      visible: row.visible
    });
  }
  return { layouts: Array.from(layoutMap.values()) };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-uAwZSRX1.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.D8aOoMP0.js","_app/immutable/chunks/51XDbXE4.js","_app/immutable/chunks/CsVHGGuQ.js","_app/immutable/chunks/B1q6MfPq.js","_app/immutable/chunks/BM3iUIG-.js","_app/immutable/chunks/BOBj3V8K.js"];
const stylesheets = ["_app/immutable/assets/0.CsmhbR_e.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-CsHn3RLQ.js.map
