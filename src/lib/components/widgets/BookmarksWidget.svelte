<script lang="ts">
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { Plus, Trash2, ExternalLink, RefreshCw } from 'lucide-svelte';

	interface Bookmark {
		id: string;
		url: string;
		title: string;
		description?: string | null;
		tags?: string | null;
		statusCode?: number | null;
		isAlive?: boolean | null;
		statusCheckedAt?: string | null;
	}
	interface Props {
		bookmarks?: Bookmark[];
	}
	let { bookmarks: initial = [] }: Props = $props();
	let bookmarks = $state<Bookmark[]>(initial);
	let showForm = $state(false);
	let newUrl = $state('');
	let newTitle = $state('');
	let checking = $state<Set<string>>(new Set());

	function statusColor(b: Bookmark) {
		if (b.statusCheckedAt === null || b.statusCheckedAt === undefined) return '#6c7086'; // grey
		if (b.isAlive === true) return '#a6e3a1'; // green
		if (b.statusCode && b.statusCode >= 300 && b.statusCode < 400) return '#f9e2af'; // yellow
		return '#f38ba8'; // red
	}

	async function addBookmark() {
		if (!newUrl.trim() || !newTitle.trim()) return;
		const res = await fetch('/api/bookmarks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url: newUrl.trim(), title: newTitle.trim() })
		});
		if (res.ok) {
			const b = await res.json();
			bookmarks = [b, ...bookmarks];
			newUrl = '';
			newTitle = '';
			showForm = false;
		}
	}

	async function deleteBookmark(id: string) {
		await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
		bookmarks = bookmarks.filter((b) => b.id !== id);
	}

	async function checkBookmark(id: string) {
		checking = new Set([...checking, id]);
		try {
			const res = await fetch(`/api/bookmarks/${id}/check`, { method: 'POST' });
			if (res.ok) {
				const updated = await res.json();
				bookmarks = bookmarks.map((b) => (b.id === id ? { ...b, ...updated } : b));
			}
		} finally {
			const next = new Set(checking);
			next.delete(id);
			checking = next;
		}
	}
</script>

<WidgetContainer title="Bookmarks">
	{#snippet actions()}
		<button
			onclick={() => (showForm = !showForm)}
			class="rounded p-1 hover:bg-[var(--surface-alt)]"
			title="Add bookmark"
		>
			<Plus size={14} class="text-[var(--accent)]" />
		</button>
	{/snippet}

	{#if showForm}
		<div class="border-b border-[var(--border)] p-3 space-y-2">
			<input
				bind:value={newUrl}
				placeholder="https://…"
				class="w-full rounded border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-1.5 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
			/>
			<div class="flex gap-2">
				<input
					bind:value={newTitle}
					onkeydown={(e) => e.key === 'Enter' && addBookmark()}
					placeholder="Title"
					class="flex-1 rounded border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-1.5 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
				/>
				<button
					onclick={addBookmark}
					class="rounded bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--bg)]"
				>
					Add
				</button>
			</div>
		</div>
	{/if}

	<ul class="divide-y divide-[var(--border)]">
		{#each bookmarks as b (b.id)}
			<li class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface-alt)] group">
				<!-- Status dot -->
				<span
					class="w-2 h-2 rounded-full flex-shrink-0"
					style="background-color: {statusColor(b)}"
					title={b.statusCode ? `HTTP ${b.statusCode}` : 'Never checked'}
				></span>
				<div class="flex-1 min-w-0">
					<a
						href={b.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] truncate block"
					>
						{b.title}
					</a>
					{#if b.description}
						<p class="text-xs text-[var(--text-muted)] truncate">{b.description}</p>
					{/if}
				</div>
				<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						onclick={() => checkBookmark(b.id)}
						disabled={checking.has(b.id)}
						class="p-1 rounded hover:bg-[var(--surface)] disabled:opacity-50"
						title="Check status"
					>
						<RefreshCw size={11} class="text-[var(--text-muted)] {checking.has(b.id) ? 'animate-spin' : ''}" />
					</button>
					<a href={b.url} target="_blank" rel="noopener noreferrer" class="p-1 rounded hover:bg-[var(--surface)]">
						<ExternalLink size={11} class="text-[var(--text-muted)]" />
					</a>
					<button onclick={() => deleteBookmark(b.id)} class="p-1 rounded hover:bg-[var(--surface)]">
						<Trash2 size={11} class="text-[var(--red)]" />
					</button>
				</div>
			</li>
		{/each}
		{#if bookmarks.length === 0}
			<li class="flex items-center justify-center h-32">
				<p class="text-sm text-[var(--text-muted)]">No bookmarks yet</p>
			</li>
		{/if}
	</ul>
</WidgetContainer>
