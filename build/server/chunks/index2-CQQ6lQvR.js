import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { mkdirSync } from 'fs';

const widgetLayouts = sqliteTable("widget_layouts", {
  widgetType: text("widget_type").primaryKey(),
  colStart: integer("col_start").notNull(),
  colEnd: integer("col_end").notNull(),
  rowStart: integer("row_start").notNull(),
  rowEnd: integer("row_end").notNull(),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true)
});
const goals = sqliteTable("goals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  color: text("color").notNull().default("#7c3aed"),
  isCompleted: integer("is_completed", { mode: "boolean" }).notNull().default(false),
  completedAt: text("completed_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  goalId: text("goal_id").references(() => goals.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  isCompleted: integer("is_completed", { mode: "boolean" }).notNull().default(false),
  completedAt: text("completed_at"),
  dueDate: text("due_date"),
  priority: text("priority").notNull().default("medium"),
  // low | medium | high
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
const rssFeeds = sqliteTable("rss_feeds", {
  id: text("id").primaryKey(),
  url: text("url").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  siteUrl: text("site_url"),
  fetchIntervalMinutes: integer("fetch_interval_minutes").notNull().default(15),
  lastFetchedAt: text("last_fetched_at"),
  lastEtag: text("last_etag"),
  lastModified: text("last_modified"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull()
});
const rssItems = sqliteTable("rss_items", {
  id: text("id").primaryKey(),
  // feed guid
  feedId: text("feed_id").notNull().references(() => rssFeeds.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  link: text("link"),
  description: text("description"),
  author: text("author"),
  publishedAt: text("published_at"),
  isSaved: integer("is_saved", { mode: "boolean" }).notNull().default(false),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  fetchedAt: text("fetched_at").notNull()
});
const bookmarks = sqliteTable("bookmarks", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  tags: text("tags"),
  // JSON array string
  favicon: text("favicon"),
  statusCode: integer("status_code"),
  isAlive: integer("is_alive", { mode: "boolean" }),
  statusCheckedAt: text("status_checked_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
const calendarEvents = sqliteTable("calendar_events", {
  id: text("id").primaryKey(),
  source: text("source").notNull().default("google"),
  // google | ics
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  startAt: text("start_at").notNull(),
  endAt: text("end_at").notNull(),
  isAllDay: integer("is_all_day", { mode: "boolean" }).notNull().default(false),
  recurrence: text("recurrence"),
  calendarId: text("calendar_id"),
  calendarName: text("calendar_name"),
  syncedAt: text("synced_at").notNull()
});
const chatConversations = sqliteTable("chat_conversations", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default("New conversation"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
const chatMessages = sqliteTable("chat_messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id").notNull().references(() => chatConversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  // user | assistant
  content: text("content").notNull(),
  createdAt: text("created_at").notNull()
});
const icsSubscriptions = sqliteTable("ics_subscriptions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  color: text("color").notNull().default("#89b4fa"),
  lastSyncedAt: text("last_synced_at"),
  createdAt: text("created_at").notNull()
});
const watchlistTickers = sqliteTable("watchlist_tickers", {
  id: text("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  // e.g. AAPL, BTC-USD
  displayName: text("display_name"),
  // override label
  createdAt: text("created_at").notNull()
});
const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookmarks,
  calendarEvents,
  chatConversations,
  chatMessages,
  goals,
  icsSubscriptions,
  rssFeeds,
  rssItems,
  settings,
  tasks,
  watchlistTickers,
  widgetLayouts
}, Symbol.toStringTag, { value: "Module" }));
mkdirSync("./data", { recursive: true });
const sqlite = new Database("./data/dashboard.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

export { rssItems as a, bookmarks as b, calendarEvents as c, db as d, chatConversations as e, watchlistTickers as f, goals as g, chatMessages as h, icsSubscriptions as i, rssFeeds as r, settings as s, tasks as t, widgetLayouts as w };
//# sourceMappingURL=index2-CQQ6lQvR.js.map
