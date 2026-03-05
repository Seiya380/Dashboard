<script lang="ts">
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { formatDate, formatTime, isToday, isTomorrow } from '$lib/utils/dates.js';
	import { Calendar, Plus, Trash2, RefreshCw, Upload } from 'lucide-svelte';

	interface CalendarEvent {
		id: string;
		title: string;
		startAt: string;
		endAt: string;
		isAllDay: boolean;
		location?: string | null;
	}
	interface IcsSub {
		id: string;
		name: string;
		url: string;
		color: string;
		lastSyncedAt?: string | null;
	}

	interface Props {
		events?: CalendarEvent[];
		icsSubscriptions?: IcsSub[];
	}

	let { events = [], icsSubscriptions: initialSubs = [] }: Props = $props();

	let subs = $state<IcsSub[]>(initialSubs);
	let localEvents = $state<CalendarEvent[]>(events);

	type Tab = 'events' | 'calendars';
	let activeTab = $state<Tab>('events');
	let showAddForm = $state(false);
	let newUrl = $state('');
	let newName = $state('');
	let adding = $state(false);
	let addError = $state('');
	let syncing = $state<Set<string>>(new Set());
	let fileInput = $state<HTMLInputElement | null>(null);
	let uploading = $state(false);

	function dayLabel(iso: string) {
		if (isToday(iso)) return 'Today';
		if (isTomorrow(iso)) return 'Tomorrow';
		return formatDate(iso, { weekday: 'short', month: 'short', day: 'numeric' });
	}

	async function addCalendar() {
		if (!newUrl.trim()) return;
		adding = true;
		addError = '';
		try {
			const res = await fetch('/api/calendar/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: newUrl.trim(), name: newName.trim() || undefined })
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({ error: 'Failed to add calendar' }));
				addError = err.error ?? 'Failed to add calendar';
				return;
			}
			const sub = await res.json();
			subs = [...subs, sub];
			newUrl = '';
			newName = '';
			showAddForm = false;
			// Reload events after a brief delay for the sync to complete
			setTimeout(() => refreshEvents(), 2000);
		} finally {
			adding = false;
		}
	}

	async function removeSub(id: string) {
		await fetch(`/api/calendar/subscribe/${id}`, { method: 'DELETE' });
		subs = subs.filter((s) => s.id !== id);
	}

	async function syncSub(id: string) {
		syncing = new Set([...syncing, id]);
		try {
			await fetch(`/api/calendar/subscribe/${id}`, { method: 'POST' });
			await refreshEvents();
			subs = subs.map((s) =>
				s.id === id ? { ...s, lastSyncedAt: new Date().toISOString() } : s
			);
		} finally {
			const next = new Set(syncing);
			next.delete(id);
			syncing = next;
		}
	}

	async function refreshEvents() {
		const res = await fetch('/api/calendar');
		if (res.ok) localEvents = await res.json();
	}

	async function uploadIcs(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		const form = new FormData();
		form.append('file', file);
		try {
			const res = await fetch('/api/calendar/ics', { method: 'POST', body: form });
			if (res.ok) {
				input.value = '';
				await refreshEvents();
			}
		} finally {
			uploading = false;
		}
	}
</script>

<WidgetContainer title="Calendar">
	{#snippet actions()}
		<button
			onclick={() => (activeTab = activeTab === 'events' ? 'calendars' : 'events')}
			class="rounded p-1 hover:bg-[var(--surface-alt)] text-xs text-[var(--text-muted)]"
			title="Manage calendars"
		>
			<Calendar size={14} />
		</button>
		<button
			onclick={() => (showAddForm = !showAddForm)}
			class="rounded p-1 hover:bg-[var(--surface-alt)]"
			title="Add calendar"
		>
			<Plus size={14} class="text-[var(--accent)]" />
		</button>
	{/snippet}

	<!-- Add calendar form -->
	{#if showAddForm}
		<div class="border-b border-[var(--border)] p-3 space-y-2">
			<p class="text-xs text-[var(--text-muted)]">
				Paste your Google Calendar ICS URL:
				<a
					href="https://support.google.com/calendar/answer/37648"
					target="_blank"
					rel="noopener noreferrer"
					class="text-[var(--accent)] underline"
				>how?</a>
			</p>
			<input
				bind:value={newUrl}
				placeholder="https://calendar.google.com/calendar/ical/…"
				class="w-full rounded border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-1.5 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
			/>
			<div class="flex gap-2">
				<input
					bind:value={newName}
					placeholder="Calendar name (optional)"
					onkeydown={(e) => e.key === 'Enter' && addCalendar()}
					class="flex-1 rounded border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-1.5 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
				/>
				<button
					onclick={addCalendar}
					disabled={adding || !newUrl.trim()}
					class="rounded bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--bg)] disabled:opacity-50"
				>
					{adding ? '…' : 'Add'}
				</button>
			</div>
			{#if addError}
				<p class="text-xs text-[var(--red)]">{addError}</p>
			{/if}

			<!-- Divider -->
			<div class="flex items-center gap-2 pt-1">
				<div class="h-px flex-1 bg-[var(--border)]"></div>
				<span class="text-xs text-[var(--text-muted)]">or</span>
				<div class="h-px flex-1 bg-[var(--border)]"></div>
			</div>

			<!-- ICS file upload -->
			<label class="flex cursor-pointer items-center gap-2 rounded border border-dashed border-[var(--border)] px-3 py-2 hover:border-[var(--accent)]">
				<Upload size={13} class="text-[var(--text-muted)]" />
				<span class="text-xs text-[var(--text-muted)]">
					{uploading ? 'Importing…' : 'Import .ics file'}
				</span>
				<input
					bind:this={fileInput}
					type="file"
					accept=".ics,text/calendar"
					onchange={uploadIcs}
					class="hidden"
				/>
			</label>
		</div>
	{/if}

	<!-- Events tab -->
	{#if activeTab === 'events'}
		{#if localEvents.length === 0}
			<div class="flex h-full flex-col items-center justify-center gap-3 p-6">
				<Calendar size={36} class="text-[var(--text-muted)]" />
				{#if subs.length === 0}
					<p class="text-center text-sm text-[var(--text-muted)]">
						Add a calendar using the <strong>+</strong> button above.
					</p>
					<p class="text-center text-xs text-[var(--text-muted)] leading-relaxed">
						Get your ICS URL from Google Calendar:<br />
						Settings → [Calendar] → <em>Secret address in iCal format</em>
					</p>
				{:else}
					<p class="text-sm text-[var(--text-muted)]">No upcoming events</p>
				{/if}
			</div>
		{:else}
			<ul class="divide-y divide-[var(--border)]">
				{#each localEvents as event (event.id)}
					<li class="px-4 py-3 hover:bg-[var(--surface-alt)]">
						<span class="text-xs font-semibold text-[var(--accent)]">{dayLabel(event.startAt)}</span>
						<p class="mt-0.5 truncate text-sm font-medium text-[var(--text)]">{event.title}</p>
						{#if event.isAllDay}
							<p class="text-xs text-[var(--text-muted)]">All day</p>
						{:else}
							<p class="text-xs text-[var(--text-muted)]">
								{formatTime(event.startAt)} – {formatTime(event.endAt)}
							</p>
						{/if}
						{#if event.location}
							<p class="mt-0.5 truncate text-xs text-[var(--text-muted)]">📍 {event.location}</p>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}

	<!-- Calendars tab -->
	{:else}
		<ul class="divide-y divide-[var(--border)]">
			{#each subs as sub (sub.id)}
				<li class="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-alt)] group">
					<span
						class="h-2.5 w-2.5 rounded-full flex-shrink-0"
						style="background: {sub.color}"
					></span>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-[var(--text)] truncate">{sub.name}</p>
						{#if sub.lastSyncedAt}
							<p class="text-xs text-[var(--text-muted)]">
								Synced {formatDate(sub.lastSyncedAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
							</p>
						{:else}
							<p class="text-xs text-[var(--text-muted)]">Not yet synced</p>
						{/if}
					</div>
					<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
						<button
							onclick={() => syncSub(sub.id)}
							disabled={syncing.has(sub.id)}
							class="p-1 rounded hover:bg-[var(--surface)] disabled:opacity-50"
							title="Sync now"
						>
							<RefreshCw size={12} class="text-[var(--text-muted)] {syncing.has(sub.id) ? 'animate-spin' : ''}" />
						</button>
						<button
							onclick={() => removeSub(sub.id)}
							class="p-1 rounded hover:bg-[var(--surface)]"
							title="Remove"
						>
							<Trash2 size={12} class="text-[var(--red)]" />
						</button>
					</div>
				</li>
			{/each}
			{#if subs.length === 0}
				<li class="flex flex-col items-center justify-center gap-2 py-8">
					<p class="text-sm text-[var(--text-muted)]">No calendars connected</p>
				</li>
			{/if}
		</ul>
	{/if}
</WidgetContainer>
