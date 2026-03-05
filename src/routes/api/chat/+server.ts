import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { chatConversations, chatMessages } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { getAnthropicClient } from '$lib/server/ai/claude.js';
import { now } from '$lib/utils/dates.js';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { content, conversationId: existingConvId } = body;

	if (!content?.trim()) return json({ error: 'Content required' }, { status: 400 });

	// Get or create conversation
	let conversationId = existingConvId;
	if (!conversationId) {
		conversationId = crypto.randomUUID();
		const ts = now();
		await db.insert(chatConversations).values({
			id: conversationId,
			title: content.slice(0, 50),
			createdAt: ts,
			updatedAt: ts
		});
	} else {
		await db
			.update(chatConversations)
			.set({ updatedAt: now() })
			.where(eq(chatConversations.id, conversationId));
	}

	// Persist user message
	const userMsgId = crypto.randomUUID();
	await db.insert(chatMessages).values({
		id: userMsgId,
		conversationId,
		role: 'user',
		content: content.trim(),
		createdAt: now()
	});

	// Load history for context
	const history = await db
		.select()
		.from(chatMessages)
		.where(eq(chatMessages.conversationId, conversationId))
		.orderBy(chatMessages.createdAt)
		.limit(20);

	const anthropic = getAnthropicClient();
	const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

	const assistantMsgId = crypto.randomUUID();

	const stream = new ReadableStream({
		async start(controller) {
			const enc = new TextEncoder();
			let fullText = '';

			try {
				const apiStream = await anthropic.messages.stream({
					model: 'claude-sonnet-4-6',
					max_tokens: 2048,
					system: `You are a helpful personal assistant. Today is ${today}. Be concise and helpful.`,
					messages: history.map((m) => ({
						role: m.role as 'user' | 'assistant',
						content: m.content
					}))
				});

				for await (const chunk of apiStream) {
					if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
						fullText += chunk.delta.text;
						controller.enqueue(
							enc.encode(`data: ${JSON.stringify({ type: 'text', text: chunk.delta.text })}\n\n`)
						);
					}
				}

				// Persist assistant message
				await db.insert(chatMessages).values({
					id: assistantMsgId,
					conversationId,
					role: 'assistant',
					content: fullText,
					createdAt: now()
				});

				controller.enqueue(
					enc.encode(
						`data: ${JSON.stringify({ type: 'done', messageId: assistantMsgId, conversationId })}\n\n`
					)
				);
			} catch (err) {
				console.error('Chat stream error:', err);
				controller.enqueue(enc.encode(`data: ${JSON.stringify({ type: 'error', error: String(err) })}\n\n`));
			} finally {
				controller.close();
			}
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
};
