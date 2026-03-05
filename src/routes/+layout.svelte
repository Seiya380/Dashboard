<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	onMount(() => {
		// Register service worker for PWA
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js').catch(() => {/* non-critical */});
		}
		// Restore theme from localStorage
		const saved = localStorage.getItem('theme');
		if (saved) document.documentElement.setAttribute('data-theme', saved);
	});

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<!-- Background wallpaper scene -->
<div class="bg-scene"></div>

<div class="relative z-10 flex min-h-screen flex-col overflow-x-hidden">
	<header
		class="flex items-center justify-between px-5 py-3"
		style="
			background: var(--glass-bg);
			backdrop-filter: blur(var(--glass-blur));
			-webkit-backdrop-filter: blur(var(--glass-blur));
			border-bottom: 1px solid var(--glass-border);
		"
	>
		<h1 class="gradient-text text-sm font-bold tracking-widest uppercase">Dashboard</h1>
		<div class="flex items-center gap-2">
			<ThemeToggle />
		</div>
	</header>
	<main class="flex-1">
		{@render children()}
	</main>
</div>
