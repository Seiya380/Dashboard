<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
		actions?: Snippet;
		class?: string;
		scrollable?: boolean;
	}

	let { title, children, actions, class: cls = '', scrollable = true }: Props = $props();
</script>

<div class="widget-card flex h-full flex-col {cls}">
	<div
		class="widget-header-divider relative z-10 flex items-center justify-between px-4 py-3"
		style="border-bottom: 1px solid;"
	>
		<h2 class="text-xs font-semibold tracking-widest uppercase" style="color: var(--text-muted);">{title}</h2>
		{#if actions}
			<div class="flex items-center gap-2">
				{@render actions()}
			</div>
		{/if}
	</div>
	<div class="relative z-10 flex-1 {scrollable ? 'overflow-y-auto' : 'overflow-hidden'}">
		{@render children()}
	</div>
</div>
