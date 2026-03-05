<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		quote?: { text: string; author: string } | null;
	}
	let { quote }: Props = $props();

	let visible = $state(false);
	let fading = $state(false);

	function enter() {
		if (fading) return;
		fading = true;
		setTimeout(() => {
			visible = false;
			sessionStorage.setItem('splash-shown', '1');
		}, 900);
	}

	onMount(() => {
		if (sessionStorage.getItem('splash-shown')) {
			visible = false;
			return;
		}
		visible = true;
		const timer = setTimeout(enter, 6000);
		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="splash"
		class:fading
		onclick={enter}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && enter()}
		role="dialog"
		aria-modal="true"
	>
		<div class="splash-inner">
			{#if quote}
				<blockquote class="splash-quote">
					<span class="splash-mark">"</span>{quote.text}<span class="splash-mark">"</span>
				</blockquote>
				<cite class="splash-author">— {quote.author}</cite>
			{/if}
			<p class="splash-hint">[ press any key ]</p>
		</div>
	</div>
{/if}

<style>
	.splash {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background:
			linear-gradient(rgba(6, 6, 8, 0.82), rgba(6, 6, 8, 0.82)),
			url('/Knights-of-Sidonia.png') center / cover no-repeat;
		animation: splash-in 1.2s ease forwards;
		transition: opacity 0.9s ease;
	}

	.splash.fading {
		opacity: 0;
		pointer-events: none;
	}

	@keyframes splash-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	.splash-inner {
		text-align: center;
		max-width: 720px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		animation: content-rise 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
	}

	@keyframes content-rise {
		from { opacity: 0; transform: translateY(20px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.splash-quote {
		font-size: clamp(1.4rem, 3vw, 2.2rem);
		font-weight: 300;
		font-style: italic;
		line-height: 1.5;
		color: #c2c8d6;
		letter-spacing: 0.01em;
	}

	.splash-mark {
		color: #d43030;
		font-style: normal;
		font-weight: 500;
	}

	.splash-author {
		font-style: normal;
		font-size: 0.85rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #5e6878;
	}

	.splash-hint {
		margin-top: 2rem;
		font-size: 0.7rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: #3a4050;
		animation: blink 2s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0.2; }
	}
</style>
