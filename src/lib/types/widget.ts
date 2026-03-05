export type WidgetType = 'quote' | 'calendar' | 'goals' | 'chat' | 'news' | 'bookmarks' | 'embed' | 'watchlist' | 'spotify' | 'links';

export interface WidgetLayout {
	widgetType: WidgetType;
	colStart: number;
	colEnd: number;
	rowStart: number;
	rowEnd: number;
	visible: boolean;
}

export const DEFAULT_LAYOUTS: WidgetLayout[] = [
	{ widgetType: 'quote',     colStart: 1,  colEnd: 13, rowStart: 1,  rowEnd: 3,  visible: false },
	// Embed: dominant left panel
	{ widgetType: 'embed',     colStart: 1,  colEnd: 8,  rowStart: 1,  rowEnd: 8,  visible: true  },
	// Calendar: right sidebar top
	{ widgetType: 'calendar',  colStart: 8,  colEnd: 13, rowStart: 1,  rowEnd: 7,  visible: true  },
	// Spotify: right sidebar bottom
	{ widgetType: 'spotify',   colStart: 8,  colEnd: 13, rowStart: 7,  rowEnd: 11, visible: true  },
	// Bottom row: Pomodoro | Links | News
	{ widgetType: 'goals',     colStart: 1,  colEnd: 4,  rowStart: 8,  rowEnd: 11, visible: true  },
	{ widgetType: 'links',     colStart: 4,  colEnd: 6,  rowStart: 8,  rowEnd: 11, visible: true  },
	{ widgetType: 'news',      colStart: 6,  colEnd: 8,  rowStart: 8,  rowEnd: 11, visible: true  },
	{ widgetType: 'watchlist', colStart: 8,  colEnd: 13, rowStart: 7,  rowEnd: 11, visible: false },
	{ widgetType: 'bookmarks', colStart: 1,  colEnd: 7,  rowStart: 8,  rowEnd: 11, visible: false },
	{ widgetType: 'chat',      colStart: 9,  colEnd: 13, rowStart: 1,  rowEnd: 8,  visible: false },
];
