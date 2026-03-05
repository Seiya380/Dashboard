<script lang="ts">
	import DashboardGrid from '$lib/components/layout/DashboardGrid.svelte';
	import QuoteSplash from '$lib/components/widgets/QuoteSplash.svelte';
	import QuoteWidget from '$lib/components/widgets/QuoteWidget.svelte';
	import CalendarWidget from '$lib/components/widgets/CalendarWidget.svelte';
	import PomodoroWidget from '$lib/components/widgets/PomodoroWidget.svelte';
	import ChatWidget from '$lib/components/widgets/ChatWidget.svelte';
	import NewsWidget from '$lib/components/widgets/NewsWidget.svelte';
	import BookmarksWidget from '$lib/components/widgets/BookmarksWidget.svelte';
	import EmbedWidget from '$lib/components/widgets/EmbedWidget.svelte';
	import WatchlistWidget from '$lib/components/widgets/WatchlistWidget.svelte';
	import SpotifyWidget from '$lib/components/widgets/SpotifyWidget.svelte';
	import LinksWidget from '$lib/components/widgets/LinksWidget.svelte';
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';

	import type { PageData } from './$types';
	import type { LayoutData } from './$types';

	interface Props {
		data: PageData & { layouts: LayoutData['layouts'] };
	}
	let { data }: Props = $props();
</script>

<!-- Full-screen quote splash (once per session) -->
<QuoteSplash quote={data.quote} />

<DashboardGrid layouts={data.layouts}>
	{#snippet children(layout)}
		{#if layout.widgetType === 'quote'}
			<WidgetContainer title="Daily Quote" scrollable={false}>
				<QuoteWidget quote={data.quote} />
			</WidgetContainer>
		{:else if layout.widgetType === 'calendar'}
			<CalendarWidget events={data.events} icsSubscriptions={data.icsSubscriptions} />
		{:else if layout.widgetType === 'goals'}
			<PomodoroWidget />
		{:else if layout.widgetType === 'chat'}
			<ChatWidget initialMessages={data.messages} conversationId={data.conversationId} />
		{:else if layout.widgetType === 'news'}
			<NewsWidget items={data.newsItems} feeds={data.feeds} />
		{:else if layout.widgetType === 'bookmarks'}
			<BookmarksWidget bookmarks={data.bookmarks} />
		{:else if layout.widgetType === 'embed'}
			<EmbedWidget initialUrl={data.embedUrl} />
		{:else if layout.widgetType === 'watchlist'}
			<WatchlistWidget savedSymbols={data.watchlistSymbols} />
		{:else if layout.widgetType === 'spotify'}
			<SpotifyWidget />
		{:else if layout.widgetType === 'links'}
			<LinksWidget />
		{/if}
	{/snippet}
</DashboardGrid>
