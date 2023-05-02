import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load = (({ cookies, url }) => {
	const canAccess = cookies.get('access') === 'true';

	if (url.pathname === '/') {
		throw redirect(302, '/parser');
	}

	if (url.pathname === '/login' && canAccess === false) {
		return;
	} else if (url.pathname === '/login' && canAccess) {
		throw redirect(302, '/parser');
	} else if (canAccess === false) {
		throw redirect(307, '/login');
	}
}) satisfies LayoutServerLoad;
