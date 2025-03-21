import { getSEO } from '$lib/utils/sanity';
import { getSettings } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const seo = await getSEO();
	const settings = await getSettings();
	const { pathname } = url
	if (seo, settings, pathname) {
		return {
			seo,
			settings,
			pathname
		};
	}
  throw error(404, 'Not found');
}