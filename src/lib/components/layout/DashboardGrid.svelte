<script lang="ts">
	import type { WidgetLayout } from '$lib/types/widget.js';
	import type { Snippet } from 'svelte';

	interface Props {
		layouts: WidgetLayout[];
		children: Snippet<[WidgetLayout]>;
	}

	let { layouts, children }: Props = $props();
</script>

<div class="dashboard-grid">
	{#each layouts.filter((l) => l.visible) as layout (layout.widgetType)}
		<div
			data-widget={layout.widgetType}
			style="
				grid-column: {layout.colStart} / {layout.colEnd};
				grid-row: {layout.rowStart} / {layout.rowEnd};
				min-height: 0;
			"
		>
			{@render children(layout)}
		</div>
	{/each}
</div>
