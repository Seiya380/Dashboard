<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { ExternalLink, Music, LogOut, ListMusic } from 'lucide-svelte';

	interface Track {
		name: string; artist: string; album: string;
		albumArt: string | null; progress: number; duration: number; url: string;
	}
	interface NowPlaying {
		connected: boolean; playing?: boolean; track?: Track;
	}
	interface Playlist {
		id: string; name: string; cover: string | null; total: number; url: string;
	}

	let state     = $state<NowPlaying>({ connected: false });
	let playlists = $state<Playlist[]>([]);
	let tab       = $state<'playlists' | 'recent'>('playlists');
	let recent    = $state<{ name: string; artist: string; albumArt: string | null; url: string }[]>([]);

	// Local progress ticker — increments every second so the bar moves smoothly
	let localProgress = $state(0);
	let duration      = $state(0);
	let progressPct   = $derived(duration > 0 ? Math.min(100, (localProgress / duration) * 100) : 0);
	function fmt(ms: number) {
		const s = Math.floor(ms / 1000);
		return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
	}

	let pollTimer: ReturnType<typeof setInterval> | null = null; // full refresh every 30s
	let npTimer:   ReturnType<typeof setInterval> | null = null; // now-playing only every 5s
	let tickTimer: ReturnType<typeof setInterval> | null = null;

	function startTick() {
		if (tickTimer) clearInterval(tickTimer);
		tickTimer = setInterval(() => {
			if (state.playing) localProgress = Math.min(localProgress + 1000, duration);
		}, 1000);
	}

	function stopTick() {
		if (tickTimer) clearInterval(tickTimer);
		tickTimer = null;
	}

	async function fetchNowPlaying() {
		try {
			const res = await fetch('/api/spotify/now-playing');
			if (!res.ok) return;
			const np: NowPlaying = await res.json();
			if (np.track) { localProgress = np.track.progress; duration = np.track.duration; }
			state = np;
			if (np.playing) startTick(); else stopTick();
		} catch { /* ignore */ }
	}

	async function fetchAll() {
		await fetchNowPlaying();
		try {
			const [plRes, reRes] = await Promise.all([
				fetch('/api/spotify/playlists'),
				fetch('/api/spotify/recent'),
			]);
			if (plRes.ok) playlists = await plRes.json();
			if (reRes.ok) recent    = await reRes.json();
		} catch { /* ignore */ }
	}

	async function disconnect() {
		await fetch('/api/spotify/disconnect', { method: 'DELETE' });
		state = { connected: false };
		playlists = [];
		recent = [];
		stopTick();
	}

	onMount(async () => {
		await fetchAll();
		npTimer   = setInterval(fetchNowPlaying, 5_000);  // detect pause/skip fast
		pollTimer = setInterval(fetchAll, 30_000);         // refresh playlists/recent
	});
	onDestroy(() => {
		if (pollTimer) clearInterval(pollTimer);
		if (npTimer)   clearInterval(npTimer);
		stopTick();
	});
</script>

<WidgetContainer title="Spotify" scrollable={false}>
	{#snippet actions()}
		{#if state.connected}
			<button
				onclick={() => (tab = tab === 'playlists' ? 'recent' : 'playlists')}
				class="p-1 opacity-60 hover:opacity-100 transition-opacity"
				title={tab === 'playlists' ? 'Recently played' : 'Playlists'}
			>
				<ListMusic size={12} style="color: var(--text-muted)" />
			</button>
			<button onclick={disconnect} class="p-1 opacity-40 hover:opacity-100 transition-opacity" title="Disconnect">
				<LogOut size={12} style="color: var(--text-muted)" />
			</button>
		{/if}
	{/snippet}

	<div class="flex h-full flex-col">

		<!-- Not connected -->
		{#if !state.connected}
			<div class="flex flex-col items-center justify-center h-full gap-3 px-4">
				<Music size={24} style="color: var(--text-muted)" />
				<a
					href="/api/spotify/login"
					class="flex items-center gap-2 px-5 py-2 text-xs tracking-widest uppercase"
					style="border: 1px solid #1ed760; color: #1ed760;"
					onmouseenter={(e) => (e.currentTarget.style.background = '#1ed76018')}
					onmouseleave={(e) => (e.currentTarget.style.background = 'transparent')}
				>
					Connect Spotify
				</a>
			</div>

		{:else}
			<!-- Now playing bar (always visible when playing) -->
			{#if state.playing && state.track}
				{@const t = state.track}
				<div class="flex items-center gap-2 px-3 py-2" style="border-bottom: 1px solid var(--border);">
					{#if t.albumArt}
						<img src={t.albumArt} alt="" class="h-8 w-8 flex-shrink-0 object-cover" />
					{/if}
					<div class="flex-1 min-w-0">
						<a href={t.url} target="_blank" rel="noopener noreferrer"
							class="text-xs font-medium truncate block hover:underline" style="color: var(--text);">
							{t.name}
						</a>
						<p class="text-[10px] truncate" style="color: var(--text-muted);">{t.artist}</p>
						<div class="mt-1 h-px w-full" style="background: var(--border);">
							<div class="h-px" style="width:{progressPct}%; background:#1ed760;"></div>
						</div>
						<div class="flex justify-between mt-0.5">
							<span class="text-[9px]" style="color:var(--text-muted);">{fmt(localProgress)}</span>
							<span class="text-[9px]" style="color:var(--text-muted);">{fmt(duration)}</span>
						</div>
					</div>
					<span class="text-[9px] flex-shrink-0" style="color:#1ed760;">▶</span>
				</div>
			{/if}

			<!-- Playlists tab -->
			{#if tab === 'playlists'}
				<div class="flex-1 overflow-y-auto">
					{#if playlists.length === 0}
						<div class="flex items-center justify-center h-full">
							<p class="text-xs" style="color: var(--text-muted);">No playlists found</p>
						</div>
					{:else}
						<!-- 2-col grid of playlist covers -->
						<div class="grid grid-cols-2 gap-1.5 p-2">
							{#each playlists as pl}
								<a
									href={pl.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group relative overflow-hidden"
									style="aspect-ratio: 1;"
									title="{pl.name} · {pl.total} tracks"
								>
									{#if pl.cover}
										<img src={pl.cover} alt={pl.name} class="h-full w-full object-cover" style="opacity:0.80;" />
									{:else}
										<div class="h-full w-full flex items-center justify-center" style="background: var(--surface);">
											<Music size={20} style="color: var(--text-muted)" />
										</div>
									{/if}
									<!-- Hover overlay -->
									<div class="absolute inset-0 flex flex-col justify-end p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
										style="background: linear-gradient(transparent, rgba(0,0,0,0.80));">
										<p class="text-[10px] font-medium leading-tight text-white truncate">{pl.name}</p>
										<p class="text-[9px] text-white/60">{pl.total} tracks</p>
									</div>
									<!-- Corner bracket -->
									<div class="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
										<ExternalLink size={10} style="color: white" />
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>

			<!-- Recently played tab -->
			{:else}
				<div class="flex-1 overflow-y-auto">
					<ul class="divide-y" style="border-color: var(--border);">
						{#each recent as track}
							<li class="flex items-center gap-2 px-3 py-2 hover:bg-[var(--surface-alt)]">
								{#if track.albumArt}
									<img src={track.albumArt} alt="" class="h-7 w-7 flex-shrink-0 object-cover" style="opacity:0.80;" />
								{/if}
								<div class="flex-1 min-w-0">
									<a href={track.url} target="_blank" rel="noopener noreferrer"
										class="text-xs truncate block hover:underline" style="color: var(--text);">
										{track.name}
									</a>
									<p class="text-[10px] truncate" style="color: var(--text-muted);">{track.artist}</p>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/if}
	</div>
</WidgetContainer>
