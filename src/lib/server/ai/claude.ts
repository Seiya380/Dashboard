import Anthropic from '@anthropic-ai/sdk';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? '';

let _client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
	if (!_client) {
		_client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
	}
	return _client;
}
