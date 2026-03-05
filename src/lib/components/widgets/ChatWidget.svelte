<script lang="ts">
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { Send, Bot, User } from 'lucide-svelte';
	import { chatStore } from '$lib/stores/chat.svelte.js';

	interface InitialMessage {
		id: string;
		role: string;
		content: string;
		createdAt: string;
	}
	interface Props {
		initialMessages?: InitialMessage[];
		conversationId?: string | null;
	}
	let { initialMessages = [], conversationId }: Props = $props();

	$effect.pre(() => { chatStore.init(initialMessages, conversationId ?? null); });

	let input = $state('');
	let messagesEl = $state<HTMLDivElement | null>(null);

	$effect(() => {
		if (chatStore.messages.length) {
			messagesEl?.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
		}
	});

	async function send() {
		const text = input.trim();
		if (!text || chatStore.streaming) return;
		input = '';
		await chatStore.send(text);
	}
</script>

<WidgetContainer title="AI Assistant" scrollable={false}>
	<div class="flex h-full flex-col">
		<!-- Messages -->
		<div bind:this={messagesEl} class="flex-1 overflow-y-auto p-3 space-y-3">
			{#if chatStore.messages.length === 0 && !chatStore.streamingContent}
				<div class="flex flex-col items-center justify-center h-full gap-2 text-[var(--text-muted)]">
					<Bot size={32} />
					<p class="text-sm">Ask me anything…</p>
				</div>
			{/if}
			{#each chatStore.messages as msg (msg.id)}
				<div class="flex gap-2 {msg.role === 'user' ? 'flex-row-reverse' : ''}">
					<div class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center {msg.role === 'user' ? 'bg-[var(--accent)]' : 'bg-[var(--surface-alt)]'}">
						{#if msg.role === 'user'}
							<User size={12} class="text-[var(--bg)]" />
						{:else}
							<Bot size={12} class="text-[var(--text-muted)]" />
						{/if}
					</div>
					<div class="max-w-[80%] rounded-xl px-3 py-2 text-sm {msg.role === 'user' ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface-alt)] text-[var(--text)]'}">
						{msg.content}
					</div>
				</div>
			{/each}
			{#if chatStore.streamingContent}
				<div class="flex gap-2">
					<div class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-[var(--surface-alt)]">
						<Bot size={12} class="text-[var(--text-muted)]" />
					</div>
					<div class="max-w-[80%] rounded-xl px-3 py-2 text-sm bg-[var(--surface-alt)] text-[var(--text)]">
						{chatStore.streamingContent}<span class="animate-pulse">▌</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Input -->
		<div class="border-t border-[var(--border)] p-3">
			<div class="flex gap-2">
				<input
					bind:value={input}
					onkeydown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
					placeholder="Type a message…"
					disabled={chatStore.streaming}
					class="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
				/>
				<button
					onclick={send}
					disabled={chatStore.streaming || !input.trim()}
					class="rounded-lg bg-[var(--accent)] px-3 py-2 disabled:opacity-50 hover:opacity-80"
				>
					<Send size={14} class="text-[var(--bg)]" />
				</button>
			</div>
		</div>
	</div>
</WidgetContainer>
