<script lang="ts">
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { Plus, Trash2, RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-svelte';
	import { onMount } from 'svelte';

	interface Ticker {
		id: string;
		symbol: string;
		displayName: string | null;
		shortName: string;
		price: number;
		change: number;
		changePct: number;
		currency: string;
		marketState: string;
		error?: string;
	}

	interface SavedSymbol {
		id: string;
		symbol: string;
		displayName: string | null;
	}
	interface Props {
		savedSymbols?: SavedSymbol[];
	}
	let { savedSymbols = [] }: Props = $props();

	let tickers = $state<Ticker[]>([]);
	let loading = $state(savedSymbols.length > 0);
	let showForm = $state(false);
	let newSymbol = $state('');
	let adding = $state(false);
	let addError = $state('');
	let refreshing = $state(false);
	let lastRefreshed = $state<Date | null>(null);

	onMount(async () => {
		// Load prices on mount
		if (savedSymbols.length > 0) await refresh();
		// Auto-refresh every 60s
		const id = setInterval(refresh, 60_000);
		return () => clearInterval(id);
	});

	async function refresh() {
		if (refreshing) return;
		refreshing = true;
		try {
			const res = await fetch('/api/watchlist');
			if (res.ok) {
				tickers = await res.json();
				lastRefreshed = new Date();
			}
		} finally {
			refreshing = false;
			loading = false;
		}
	}

	async function addTicker() {
		const sym = newSymbol.trim().toUpperCase();
		if (!sym) return;
		adding = true;
		addError = '';
		try {
			const res = await fetch('/api/watchlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ symbol: sym })
			});
			const data = await res.json();
			if (!res.ok) {
				addError = data.error ?? 'Failed to add';
				return;
			}
			tickers = [...tickers, data];
			newSymbol = '';
			showForm = false;
		} finally {
			adding = false;
		}
	}

	async function removeTicker(symbol: string) {
		await fetch(`/api/watchlist/${symbol}`, { method: 'DELETE' });
		tickers = tickers.filter((t) => t.symbol !== symbol);
	}

	function fmt(price: number, currency: string) {
		// Crypto can be large or tiny
		const decimals = price < 1 ? 4 : price < 100 ? 2 : 2;
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		}).format(price);
	}

	function fmtPct(pct: number) {
		return (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
	}

	function marketLabel(state: string) {
		if (state === 'PRE') return 'Pre-market';
		if (state === 'POST') return 'After-hours';
		if (state === 'CLOSED') return 'Closed';
		return 'Live';
	}
</script>

<WidgetContainer title="Watchlist" scrollable={false}>
	{#snippet actions()}
		{#if lastRefreshed}
			<span class="text-[10px] text-[var(--text-muted)]">
				{lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</span>
		{/if}
		<button
			onclick={refresh}
			disabled={refreshing}
			class="rounded p-1 hover:bg-[var(--surface-alt)] disabled:opacity-50"
			title="Refresh prices"
		>
			<RefreshCw size={13} class="text-[var(--text-muted)] {refreshing ? 'animate-spin' : ''}" />
		</button>
		<button
			onclick={() => { showForm = !showForm; addError = ''; }}
			class="rounded p-1 hover:bg-[var(--surface-alt)]"
			title="Add ticker"
		>
			<Plus size={14} class="text-[var(--accent)]" />
		</button>
	{/snippet}

	{#if showForm}
		<div class="border-b border-[var(--border)] p-3 space-y-2">
			<p class="text-xs text-[var(--text-muted)]">
				Enter a Yahoo Finance symbol — e.g. <code class="text-[var(--accent)]">AAPL</code>,
				<code class="text-[var(--accent)]">BTC-USD</code>,
				<code class="text-[var(--accent)]">ETH-EUR</code>,
				<code class="text-[var(--accent)]">MC.PA</code>
			</p>
			<div class="flex gap-2">
				<input
					bind:value={newSymbol}
					onkeydown={(e) => e.key === 'Enter' && addTicker()}
					placeholder="AAPL"
					class="flex-1 rounded border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-1.5 text-sm font-mono uppercase text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
				/>
				<button
					onclick={addTicker}
					disabled={adding || !newSymbol.trim()}
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
		</div>
	{/if}

	{#if loading}
		<div class="flex h-full items-center justify-center gap-2 text-[var(--text-muted)]">
			<RefreshCw size={16} class="animate-spin" />
			<span class="text-sm">Loading prices…</span>
		</div>
	{:else if tickers.length === 0}
		<div class="flex h-full flex-col items-center justify-center gap-3 p-6">
			<TrendingUp size={36} class="text-[var(--text-muted)]" />
			<p class="text-sm text-[var(--text-muted)]">No tickers yet</p>
			<p class="text-xs text-center text-[var(--text-muted)] leading-relaxed">
				Add stocks like <code class="text-[var(--accent)]">AAPL</code> or crypto like
				<code class="text-[var(--accent)]">BTC-USD</code>.<br />
				For European stocks use suffix: <code class="text-[var(--accent)]">MC.PA</code> (LVMH),
				<code class="text-[var(--accent)]">AIR.PA</code> (Airbus)
			</p>
		</div>
	{:else}
		<ul class="divide-y divide-[var(--border)]" >
			{#each tickers as ticker (ticker.symbol)}
				<li class="flex items-center gap-3 px-4 py-2 hover:bg-[var(--surface-alt)] group">
					<!-- Trend icon -->
					<div class="flex-shrink-0 w-5">
						{#if ticker.error}
							<Minus size={14} class="text-[var(--text-muted)]" />
						{:else if ticker.change > 0}
							<TrendingUp size={14} class="text-[var(--green)]" />
						{:else if ticker.change < 0}
							<TrendingDown size={14} class="text-[var(--red)]" />
						{:else}
							<Minus size={14} class="text-[var(--text-muted)]" />
						{/if}
					</div>

					<!-- Name + market state -->
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-1.5">
							<span class="text-sm font-bold font-mono text-[var(--text)]">
								{ticker.displayName ?? ticker.symbol}
							</span>
							{#if ticker.marketState !== 'REGULAR'}
								<span class="text-[10px] text-[var(--text-muted)] bg-[var(--surface-alt)] px-1 rounded">
									{marketLabel(ticker.marketState)}
								</span>
							{/if}
						</div>
						<p class="text-xs text-[var(--text-muted)] truncate">{ticker.shortName}</p>
					</div>

					<!-- Price + change -->
					{#if ticker.error}
						<span class="text-xs text-[var(--red)]">Error</span>
					{:else}
						<div class="text-right flex-shrink-0">
							<p class="text-sm font-semibold font-mono text-[var(--text)]">
								{fmt(ticker.price, ticker.currency)}
							</p>
							<p class="text-xs font-mono {ticker.change >= 0 ? 'text-[var(--green)]' : 'text-[var(--red)]'}">
								{fmtPct(ticker.changePct)}
							</p>
						</div>
					{/if}

					<!-- Delete -->
					<button
						onclick={() => removeTicker(ticker.symbol)}
						class="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[var(--surface)]"
						title="Remove"
					>
						<Trash2 size={12} class="text-[var(--red)]" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</WidgetContainer>
