import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import Database from '$lib/db';

export const load: LayoutServerLoad = async ({ params }) => {
	const slug = params.slug;
	if (slug) {
		const locationInfo = await Database.getLocationInfo(slug);
		if (locationInfo) {
			return {
				company_name: locationInfo.company_name,
				image_path: locationInfo.image_path
			};
		}
	}

	throw error(404, 'Not found');
};
