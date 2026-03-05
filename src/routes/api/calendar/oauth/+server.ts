import { redirect } from '@sveltejs/kit';
import { getAuthUrl } from '$lib/server/google/auth.js';

export const GET = async () => {
	throw redirect(302, getAuthUrl());
};
