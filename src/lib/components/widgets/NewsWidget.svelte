<script lang="ts">
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { Plus, Rss, ExternalLink, Trash2, RefreshCw } from 'lucide-svelte';
	import { formatDate } from '$lib/utils/dates.js';

	interface RssItem {
		id: string;
		title: string;
		link?: string | null;
		description?: string | null;
		publishedAt?: string | null;
		feedId: string;
	}
	interface Feed {
		id: string;
		title: string;
		url: string;
	}
	interface Props {
		items?: RssItem[];
		feeds?: Feed[];
	}
	let { items = [], feeds = [] }: Props = $props();

	let localItems = $state<RssItem[]>(items);
	let localFeeds = $state<Feed[]>(feeds);
	let showFeedForm = $state(false);
	let feedUrl = $state('');
	let adding = $state(false);
	let refreshing = $state(false);
	let addError = $state('');
	let activeTab = $state<'articles' | 'feeds'>('articles');

	async function reloadArticles() {
		const res = await fetch('/api/news?limit=50');
		if (res.ok) localItems = await res.json();
	}

	async function addFeed() {
		if (!feedUrl.trim()) return;
		adding = true;
		addError = '';
		try {
			const res = await fetch('/api/news/feeds', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: feedUrl.trim() })
			});
			if (res.ok) {
				const feed = await res.json();
				localFeeds = [...localFeeds, feed];
				feedUrl = '';
				showFeedForm = false;
				// Articles are now fetched server-side before the response returns — reload them
				await reloadArticles();
				activeTab = 'articles';
			} else {
				addError = 'Failed to add feed — check the URL';
			}
		} finally {
			adding = false;
		}
	}

	async function deleteFeed(id: string) {
		await fetch(`/api/news/feeds/${id}`, { method: 'DELETE' });
		localFeeds = localFeeds.filter((f) => f.id !== id);
		await reloadArticles();
	}

	async function refresh() {
		refreshing = true;
		try {
			await reloadArticles();
		} finally {
			refreshing = false;
		}
	}

	function stripHtml(html: string) {
		return html.replace(/<[^>]*>/g, '').slice(0, 140);
	}
</script>

<WidgetContainer title="News & RSS" scrollable={false}>
	{#snippet actions()}
		<button
			onclick={refresh}
			disabled={refreshing}
			class="rounded p-1 hover:bg-[var(--surface-alt)] disabled:opacity-50"
			title="Refresh articles"
		>
			<RefreshCw size={13} class="text-[var(--text-muted)] {refreshing ? 'animate-spin' : ''}" />
		</button>
		<button
			onclick={() => (activeTab = activeTab === 'articles' ? 'feeds' : 'articles')}
			class="rounded p-1 hover:bg-[var(--surface-alt)]"
			title="Manage feeds"
		>
			<Rss size={14} class="text-[var(--text-muted)]" />
		</button>
		<button
			onclick={() => { showFeedForm = !showFeedForm; addError = ''; }}
			class="rounded p-1 hover:bg-[var(--surface-alt)]"
			title="Add feed"
		>
			<Plus size={14} class="text-[var(--accent)]" />
		</button>
	{/snippet}

	{#if showFeedForm}
		<div class="border-b border-[var(--border)] p-3 space-y-2">
			<div class="flex gap-2">
				<input
					bind:value={feedUrl}
					onkeydown={(e) => e.key === 'Enter' && addFeed()}
					placeholder="https://example.com/feed.rss"
					class="flex-1 rounded border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-1.5 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
				/>
				<button
					onclick={addFeed}
					disabled={adding}
					class="rounded bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--bg)] disabled:opacity-50 min-w-[52px]"
				>
					{#if adding}
						<RefreshCw size={12} class="animate-spin mx-auto" />
					{:else}
						Add
					{/if}
				</button>
			</div>
			{#if addError}
				<p class="text-xs text-[var(--red)]">{addError}</p>
			{/if}
			{#if adding}
				<p class="text-xs text-[var(--text-muted)]">Fetching articles…</p>
			{/if}
		</div>
	{/if}

	{#if activeTab === 'feeds'}
		<ul class="divide-y divide-[var(--border)]">
			{#each localFeeds as feed (feed.id)}
				<li class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface-alt)] group">
					<Rss size={14} class="text-[var(--accent)] flex-shrink-0" />
					<span class="flex-1 text-sm text-[var(--text)] truncate">{feed.title}</span>
					<button
						onclick={() => deleteFeed(feed.id)}
						class="p-1 rounded hover:bg-[var(--surface)] opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<Trash2 size={12} class="text-[var(--red)]" />
					</button>
				</li>
			{/each}
			{#if localFeeds.length === 0}
				<li class="flex items-center justify-center h-24">
					<p class="text-sm text-[var(--text-muted)]">No feeds added yet</p>
				</li>
			{/if}
		</ul>
	{:else}
		<ul class="divide-y divide-[var(--border)]">
			{#each localItems.slice(0, 3) as item (item.id)}
				<li class="px-4 py-2 hover:bg-[var(--surface-alt)]">
					<div class="flex items-center gap-2">
						<div class="flex-1 min-w-0">
							<a
								href={item.link ?? '#'}
								target="_blank"
								rel="noopener noreferrer"
								class="text-xs font-medium text-[var(--text)] hover:text-[var(--accent)] line-clamp-1 leading-snug"
							>
								{item.title}
							</a>
							{#if item.publishedAt}
								<p class="text-[10px] text-[var(--text-muted)]">{formatDate(item.publishedAt)}</p>
							{/if}
						</div>
						{#if item.link}
							<a href={item.link} target="_blank" rel="noopener noreferrer" class="flex-shrink-0 p-1">
								<ExternalLink size={11} class="text-[var(--text-muted)]" />
							</a>
						{/if}
					</div>
				</li>
			{/each}
			{#if localItems.length === 0 && localFeeds.length > 0}
				<li class="flex flex-col items-center justify-center gap-2 h-32">
					<RefreshCw size={20} class="text-[var(--text-muted)]" />
					<p class="text-sm text-[var(--text-muted)]">Loading articles…</p>
					<button onclick={refresh} class="text-xs text-[var(--accent)] underline">Refresh now</button>
				</li>
			{:else if localItems.length === 0}
				<li class="flex flex-col items-center justify-center gap-2 h-32">
					<Rss size={24} class="text-[var(--text-muted)]" />
					<p class="text-sm text-[var(--text-muted)]">Add RSS feeds to see articles</p>
				</li>
			{/if}
		</ul>
	{/if}
</WidgetContainer>
