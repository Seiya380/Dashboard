import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '$env/static/private';

let _client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
	if (!_client) {
		_client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
	}
	return _client;
}
