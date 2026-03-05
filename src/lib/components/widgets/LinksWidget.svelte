<script lang="ts">
	import { onMount } from 'svelte';
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { Plus, Trash2, ExternalLink, X } from 'lucide-svelte';

	interface Link { id: string; name: string; url: string; }

	let links     = $state<Link[]>([]);
	let showForm  = $state(false);
	let newName   = $state('');
	let newUrl    = $state('');
	let adding    = $state(false);

	function favicon(url: string) {
		try {
			const host = new URL(url).hostname;
			return `https://www.google.com/s2/favicons?domain=${host}&sz=32`;
		} catch { return null; }
	}

	onMount(async () => {
		const res = await fetch('/api/links');
		if (res.ok) links = await res.json();
	});

	async function add() {
		if (!newName.trim() || !newUrl.trim()) return;
		// Auto-prefix https if missing
		const url = newUrl.trim().startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`;
		adding = true;
		try {
			const res = await fetch('/api/links', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: newName.trim(), url }),
			});
			if (res.ok) {
				links = [...links, await res.json()];
				newName = ''; newUrl = ''; showForm = false;
			}
		} finally { adding = false; }
	}

	async function remove(id: string) {
		await fetch('/api/links', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
		links = links.filter(l => l.id !== id);
	}
</script>

<WidgetContainer title="Links" scrollable={false}>
	{#snippet actions()}
		<button
			onclick={() => (showForm = !showForm)}
			class="p-1 transition-opacity opacity-60 hover:opacity-100"
			title="Add link"
		>
			{#if showForm}
				<X size={13} style="color: var(--accent)" />
			{:else}
				<Plus size={13} style="color: var(--accent)" />
			{/if}
		</button>
	{/snippet}

	<div class="flex h-full flex-col">

		<!-- Add form -->
		{#if showForm}
			<div class="flex flex-col gap-1.5 p-2" style="border-bottom: 1px solid var(--border);">
				<input
					bind:value={newName}
					placeholder="Name"
					class="w-full px-2 py-1 text-xs"
					style="background: var(--surface); border: 1px solid var(--border); color: var(--text);"
				/>
				<input
					bind:value={newUrl}
					placeholder="https://..."
					onkeydown={(e) => e.key === 'Enter' && add()}
					class="w-full px-2 py-1 text-xs"
					style="background: var(--surface); border: 1px solid var(--border); color: var(--text);"
				/>
				<button
					onclick={add}
					disabled={adding || !newName.trim() || !newUrl.trim()}
					class="w-full py-1 text-xs tracking-widest uppercase disabled:opacity-40 transition-all"
					style="border: 1px solid var(--accent); color: var(--accent); background: transparent;"
				>Add</button>
			</div>
		{/if}

		<!-- Links list -->
		{#if links.length === 0 && !showForm}
			<div class="flex flex-col items-center justify-center h-full gap-2">
				<ExternalLink size={20} style="color: var(--text-muted)" />
				<p class="text-xs tracking-wider" style="color: var(--text-muted);">NO LINKS YET</p>
			</div>
		{:else}
			<ul class="flex flex-col divide-y overflow-y-auto flex-1" style="border-color: var(--border);">
				{#each links as link}
					<li class="group flex items-center gap-2 px-3 py-2 hover:bg-[var(--surface-alt)] transition-colors">
						<!-- Favicon -->
						{#if favicon(link.url)}
							<img src={favicon(link.url)} alt="" class="h-4 w-4 flex-shrink-0" style="opacity: 0.8;" />
						{/if}
						<!-- Name -->
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex-1 text-xs font-medium truncate hover:underline"
							style="color: var(--text);"
						>{link.name}</a>
						<!-- Delete -->
						<button
							onclick={() => remove(link.id)}
							class="flex-shrink-0 opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity"
							aria-label="Remove"
						>
							<Trash2 size={11} style="color: var(--red)" />
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</WidgetContainer>
