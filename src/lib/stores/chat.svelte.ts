interface Message {
	id: string;
	role: string;
	content: string;
	createdAt: string;
}

function createChatStore() {
	let messages = $state<Message[]>([]);
	let streamingContent = $state('');
	let streaming = $state(false);
	let conversationId = $state<string | null>(null);

	return {
		get messages() {
			return messages;
		},
		get streamingContent() {
			return streamingContent;
		},
		get streaming() {
			return streaming;
		},

		init(initial: Message[], convId: string | null) {
			messages = initial;
			conversationId = convId;
		},

		async send(content: string) {
			// Add user message optimistically
			const userMsg: Message = {
				id: crypto.randomUUID(),
				role: 'user',
				content,
				createdAt: new Date().toISOString()
			};
			messages = [...messages, userMsg];
			streaming = true;
			streamingContent = '';

			try {
				const res = await fetch('/api/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ content, conversationId })
				});

				if (!res.ok || !res.body) {
					streaming = false;
					return;
				}

				const reader = res.body.getReader();
				const decoder = new TextDecoder();
				let assistantId = '';
				let assistantConvId = '';

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value, { stream: true });
					const lines = chunk.split('\n');

					for (const line of lines) {
						if (line.startsWith('data: ')) {
							const data = line.slice(6);
							if (data === '[DONE]') continue;
							try {
								const parsed = JSON.parse(data);
								if (parsed.type === 'text') {
									streamingContent += parsed.text;
								} else if (parsed.type === 'done') {
									assistantId = parsed.messageId;
									assistantConvId = parsed.conversationId;
									conversationId = assistantConvId;
								}
							} catch {
								// ignore parse errors
							}
						}
					}
				}

				// Commit streamed message
				if (streamingContent) {
					messages = [
						...messages,
						{
							id: assistantId || crypto.randomUUID(),
							role: 'assistant',
							content: streamingContent,
							createdAt: new Date().toISOString()
						}
					];
				}
			} finally {
				streaming = false;
				streamingContent = '';
			}
		}
	};
}

export const chatStore = createChatStore();
