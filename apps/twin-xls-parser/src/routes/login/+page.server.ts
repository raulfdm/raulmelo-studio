import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (email === env.USER_EMAIL && password === env.USER_PASSWORD) {
			cookies.set('access', 'true', {
				httpOnly: true,
				sameSite: 'strict',
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
			});
			throw redirect(302, '/parser');
		} else {
			return {
				email,
				message: 'Invalid credentials'
			};
		}
	}
} satisfies Actions;
