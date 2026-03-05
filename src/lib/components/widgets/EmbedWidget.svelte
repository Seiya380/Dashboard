<script lang="ts">
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { ExternalLink, Globe, Settings, AlertTriangle, X } from 'lucide-svelte';

	interface Props {
		initialUrl?: string | null;
	}
	let { initialUrl = null }: Props = $props();

	let savedUrl = $state(initialUrl);
	let inputUrl = $state(initialUrl ?? '');
	let showConfig = $state(!initialUrl);
	let checking = $state(false);
	let warning = $state('');
	let canEmbed = $state(true);
	let iframeKey = $state(0); // force re-render when URL changes

	function hostname(url: string) {
		try { return new URL(url).hostname; } catch { return url; }
	}

	async function applyUrl() {
		const url = inputUrl.trim();
		if (!url) return;

		checking = true;
		warning = '';
		canEmbed = true;

		try {
			// Server-side header check
			const res = await fetch('/api/embed', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url })
			});
			const data = await res.json();

			if (!data.canEmbed) {
				warning = data.reason ?? 'Site blocks iframe embedding.';
				canEmbed = false;
			} else if (data.warning) {
				warning = data.warning;
			}

			// Save to DB regardless — user can decide to keep it
			await fetch('/api/embed', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url })
			});

			savedUrl = url;
			iframeKey++;
			showConfig = false;
		} finally {
			checking = false;
		}
	}

	async function clearUrl() {
		await fetch('/api/embed', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url: null })
		});
		savedUrl = null;
		inputUrl = '';
		warning = '';
		canEmbed = true;
		showConfig = true;
	}
</script>

<WidgetContainer title={savedUrl ? hostname(savedUrl) : 'Embed'} scrollable={false}>
	{#snippet actions()}
		{#if savedUrl}
			<a
				href={savedUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="rounded p-1 hover:bg-[var(--surface-alt)]"
				title="Open in new tab"
			>
				<ExternalLink size={14} class="text-[var(--text-muted)]" />
			</a>
			<button
				onclick={() => (showConfig = !showConfig)}
				class="rounded p-1 hover:bg-[var(--surface-alt)]"
				title="Change URL"
			>
				<Settings size={14} class="text-[var(--text-muted)]" />
			</button>
		{/if}
	{/snippet}

	<div class="flex h-full flex-col">
		<!-- Config panel -->
		{#if showConfig}
			<div class="flex flex-col gap-3 p-4">
				<div class="flex items-center gap-2">
					<Globe size={20} class="text-[var(--accent)]" />
					<p class="text-sm font-medium text-[var(--text)]">Embed a website</p>
				</div>
				<p class="text-xs text-[var(--text-muted)] leading-relaxed">
					Paste any URL. Note: many sites (Google, GitHub, Reddit…) block iframe embedding.
					Local services (Home Assistant, Grafana, Portainer…) usually work.
				</p>
				<div class="flex gap-2">
					<input
						bind:value={inputUrl}
						onkeydown={(e) => e.key === 'Enter' && applyUrl()}
						placeholder="https://…"
						class="flex-1 rounded border border-[var(--border)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
					/>
					<button
						onclick={applyUrl}
						disabled={checking || !inputUrl.trim()}
						class="rounded bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--bg)] disabled:opacity-50"
					>
						{checking ? '…' : 'Load'}
					</button>
				</div>

				{#if warning}
					<div class="flex items-start gap-2 rounded-lg border border-[var(--yellow)]/30 bg-[var(--yellow)]/10 px-3 py-2">
						<AlertTriangle size={14} class="mt-0.5 flex-shrink-0 text-[var(--yellow)]" />
						<p class="text-xs text-[var(--yellow)]">{warning}</p>
					</div>
				{/if}

				{#if savedUrl && showConfig}
					<button
						onclick={() => (showConfig = false)}
						class="text-xs text-[var(--text-muted)] hover:text-[var(--text)] underline self-start"
					>
						← Back to embed
					</button>
				{/if}
			</div>
		{/if}

		<!-- Iframe -->
		{#if savedUrl && !showConfig}
			{#if !canEmbed}
				<!-- Blocked fallback -->
				<div class="flex flex-1 flex-col items-center justify-center gap-3 p-6">
					<AlertTriangle size={32} class="text-[var(--yellow)]" />
					<p class="text-center text-sm font-medium text-[var(--text)]">
						This site blocks embedding
					</p>
					<p class="text-center text-xs text-[var(--text-muted)]">{warning}</p>
					<div class="flex gap-2">
						<a
							href={savedUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--bg)]"
						>
							Open in new tab
						</a>
						<button
							onclick={clearUrl}
							class="rounded border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-muted)]"
						>
							Change URL
						</button>
					</div>
				</div>
			{:else}
				{#key iframeKey}
					<div class="relative flex-1 h-full overflow-hidden" style="opacity: 0.45;">
						<iframe
							src={savedUrl}
							title="Embedded site"
							class="h-full w-full border-0"
							sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
							loading="lazy"
						></iframe>
					</div>
				{/key}
			{/if}
		{/if}
	</div>
</WidgetContainer>
