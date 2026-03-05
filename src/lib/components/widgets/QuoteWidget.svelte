<script lang="ts">
	interface Quote {
		text: string;
		author: string;
	}
	interface Props {
		quote?: Quote | null;
	}
	let { quote }: Props = $props();
</script>

<div class="flex h-full flex-col items-center justify-center px-8 py-4 text-center">
	{#if quote}
		<blockquote class="text-lg font-light italic md:text-xl" style="color: var(--text);">
			"{quote.text}"
		</blockquote>
		<cite class="mt-3 text-sm not-italic gradient-text font-medium">— {quote.author}</cite>
	{:else}
		<p style="color: var(--text-muted);">No quote today.</p>
	{/if}
</div>
