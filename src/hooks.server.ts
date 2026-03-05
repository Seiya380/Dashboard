import type { Handle } from '@sveltejs/kit';
import { startRssScheduler } from '$lib/server/rss/scheduler.js';
import { startBookmarkChecker } from '$lib/server/bookmarks/checker.js';
import { startIcsScheduler } from '$lib/server/google/ics-sync.js';

let schedulersStarted = false;

if (!schedulersStarted) {
	schedulersStarted = true;
	try {
		startRssScheduler();
		startBookmarkChecker();
		startIcsScheduler();
	} catch (err) {
		console.error('Failed to start schedulers:', err);
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};
