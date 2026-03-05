<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';

	let theme = $state(
		typeof document !== 'undefined'
			? (document.documentElement.getAttribute('data-theme') ?? 'dark')
			: 'dark'
	);

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<button
	onclick={toggle}
	class="rounded-lg p-2 transition-all"
	style="background: var(--surface); border: 1px solid var(--glass-border);"
	aria-label="Toggle theme"
	title="Toggle theme"
>
	{#if theme === 'dark'}
		<Sun size={16} class="text-[var(--text-muted)]" />
	{:else}
		<Moon size={16} class="text-[var(--text-muted)]" />
	{/if}
</button>
