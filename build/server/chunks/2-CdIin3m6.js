import { d as db, g as goals, t as tasks, b as bookmarks, r as rssFeeds, a as rssItems, c as calendarEvents, e as chatConversations, i as icsSubscriptions, s as settings, f as watchlistTickers, h as chatMessages } from './index2-CQQ6lQvR.js';
import { desc, eq, gte } from 'drizzle-orm';
import { g as getQuoteOfTheDay } from './provider-LBvBUWkZ.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import './dates-CjMa0hVO.js';

const load = async () => {
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
    db.select().from(rssItems).orderBy(desc(rssItems.publishedAt)).limit(50),
    db.select().from(calendarEvents).where(gte(calendarEvents.startAt, (/* @__PURE__ */ new Date()).toISOString())).orderBy(calendarEvents.startAt).limit(20),
    Promise.resolve(getQuoteOfTheDay()),
    db.select().from(chatConversations).orderBy(desc(chatConversations.updatedAt)).limit(1),
    db.select().from(icsSubscriptions).orderBy(icsSubscriptions.createdAt),
    db.select().from(settings).where(eq(settings.key, "embed_url")).limit(1),
    db.select().from(watchlistTickers).orderBy(watchlistTickers.createdAt)
  ]);
  const goalsWithTasks = goalsData.map((g) => ({
    ...g,
    tasks: tasksData.filter((t) => t.goalId === g.id)
  }));
  let messages = [];
  let conversationId = null;
  if (latestConv.length > 0) {
    conversationId = latestConv[0].id;
    messages = await db.select().from(chatMessages).where(eq(chatMessages.conversationId, conversationId)).orderBy(chatMessages.createdAt).limit(50);
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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D4Nb2lc9.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.BeVO2xpo.js","_app/immutable/chunks/51XDbXE4.js","_app/immutable/chunks/CsVHGGuQ.js","_app/immutable/chunks/BM3iUIG-.js","_app/immutable/chunks/B1q6MfPq.js","_app/immutable/chunks/BOBj3V8K.js","_app/immutable/chunks/CRa6zWHF.js","_app/immutable/chunks/B4uFvTJC.js"];
const stylesheets = ["_app/immutable/assets/2.-Ys7mxDF.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-CdIin3m6.js.map
