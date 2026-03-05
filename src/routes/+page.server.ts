import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/index.js';
import { goals, tasks, bookmarks, rssFeeds, rssItems, calendarEvents, icsSubscriptions, chatConversations, chatMessages, settings, watchlistTickers } from '$lib/server/db/schema.js';
import { desc, eq, gte } from 'drizzle-orm';
import { getQuoteOfTheDay } from '$lib/server/quotes/provider.js';

export const load: PageServerLoad = async () => {
	const [
		goalsData,
		tasksData,
		bookmarksData,
		feedsData,
		newsData,
		eventsData,
		quoteData,
		latestConv,
		icsSubsData,
		embedSetting,
		watchlistData
	] = await Promise.all([
		db.select().from(goals).orderBy(desc(goals.createdAt)),
		db.select().from(tasks).orderBy(desc(tasks.createdAt)),
		db.select().from(bookmarks).orderBy(desc(bookmarks.createdAt)),
		db.select().from(rssFeeds).where(eq(rssFeeds.isActive, true)),
		db
			.select()
			.from(rssItems)
			.orderBy(desc(rssItems.publishedAt))
			.limit(50),
		db
			.select()
			.from(calendarEvents)
			.where(gte(calendarEvents.startAt, new Date().toISOString()))
			.orderBy(calendarEvents.startAt)
			.limit(20),
		Promise.resolve(getQuoteOfTheDay()),
		db.select().from(chatConversations).orderBy(desc(chatConversations.updatedAt)).limit(1),
		db.select().from(icsSubscriptions).orderBy(icsSubscriptions.createdAt),
		db.select().from(settings).where(eq(settings.key, 'embed_url')).limit(1),
		db.select().from(watchlistTickers).orderBy(watchlistTickers.createdAt)
	]);

	// Group tasks under goals
	const goalsWithTasks = goalsData.map((g) => ({
		...g,
		tasks: tasksData.filter((t) => t.goalId === g.id)
	}));

	// Latest conversation messages
	let messages: { id: string; role: string; content: string; createdAt: string }[] = [];
	let conversationId: string | null = null;
	if (latestConv.length > 0) {
		conversationId = latestConv[0].id;
		messages = await db
			.select()
			.from(chatMessages)
			.where(eq(chatMessages.conversationId, conversationId))
			.orderBy(chatMessages.createdAt)
			.limit(50);
	}

	return {
		quote: quoteData,
		goals: goalsWithTasks,
		bookmarks: bookmarksData,
		feeds: feedsData,
		newsItems: newsData,
		events: eventsData,
		icsSubscriptions: icsSubsData,
		embedUrl: embedSetting[0]?.value ?? null,
		watchlistSymbols: watchlistData,
		messages,
		conversationId
	};
};
