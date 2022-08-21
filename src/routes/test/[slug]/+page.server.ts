import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Database from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	const locationInfo = await Database.getLocationInfo(params.slug);
	if (locationInfo) {
		return {
			company_name: locationInfo.company_name,
			image_path: locationInfo.image_path
		};
	}

	throw error(404, 'Not found');
};
