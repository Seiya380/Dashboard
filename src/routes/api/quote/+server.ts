import { json } from '@sveltejs/kit';
import { getQuoteOfTheDay } from '$lib/server/quotes/provider.js';

export const GET = async () => {
	return json(getQuoteOfTheDay());
};
